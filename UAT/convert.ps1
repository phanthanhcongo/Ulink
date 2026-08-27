param(
    [string]$InputFile = "UAT_checklist.md",
    [string]$OutputFile = "UAT_checklist.xlsx"
)

function Parse-MarkdownTable {
    param([string[]]$Lines, [int]$StartIndex)
    $rows = @()
    $i = $StartIndex
    while ($i -lt $Lines.Count -and $Lines[$i].Trim() -eq '') { $i++ }
    if ($i -ge $Lines.Count) { return $null, $i }
    $line = $Lines[$i].Trim()
    if (-not ($line -match '^\|.*\|$')) { return $null, $i }
    $headers = $line -split '\|' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
    $i++
    if ($i -lt $Lines.Count -and $Lines[$i].Trim() -match '^\|[-:\s|]+\|$') { $i++ }
    while ($i -lt $Lines.Count) {
        $line = $Lines[$i].Trim()
        if ($line -eq '' -or -not ($line -match '^\|.*\|$')) { break }
        $cells = $line -split '\|' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
        $cells = $cells | ForEach-Object { $_.Replace('<br>', "`n").Replace('<br/>', "`n").Replace('<br />', "`n") }
        $rows += ,$cells
        $i++
    }
    return @{Headers=$headers; Rows=$rows}, $i
}

$content = Get-Content -Path $InputFile -Raw
$lines = $content -split "`r?`n"

$sections = @(
    @{Name="I. Trang User"; StartPattern='^## I\.'}
    @{Name="II. Auth"; StartPattern='^## II\.'}
    @{Name="III. Admin"; StartPattern='^## III\.'}
    @{Name="IV. Nen tang"; StartPattern='^## IV\.'}
)

$summaryTable = $null
for ($i = 0; $i -lt $lines.Count; $i++) {
    $trimmed = $lines[$i].Trim()
    if ($trimmed -match '^\| Nhóm \| SL \| Desktop \| Tablet \| Mobile \|$') {
        $result, $_ = Parse-MarkdownTable -Lines $lines -StartIndex $i
        if ($result -ne $null) { $summaryTable = $result; break }
    }
}

$sectionData = @{}
foreach ($s in $sections) { $sectionData[$s.Name] = @() }

$currentSection = $null
$currentSub = $null
$i = 0
while ($i -lt $lines.Count) {
    $trimmed = $lines[$i].Trim()
    foreach ($s in $sections) {
        if ($trimmed -match $s.StartPattern) { $currentSection = $s.Name; $currentSub = $null; break }
    }
    if ($trimmed -match '^###\s+(.+)$') { $currentSub = $matches[1] }
    if ($trimmed -match '^\|.*\|$' -and $trimmed -notmatch '^\|[-:\s|]+\|$' -and $currentSection -ne $null) {
        $result, $nextIndex = Parse-MarkdownTable -Lines $lines -StartIndex $i
        if ($result -ne $null) {
            $entry = @{SubSection=$currentSub; Headers=$result.Headers; Rows=$result.Rows}
            $sectionData[$currentSection] += $entry
            $i = $nextIndex; continue
        }
    }
    $i++
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Add()

function Add-SheetData {
    param($ws, $Name, $Data)
    $rowNum = 1
    $ws.Cells.Item($rowNum, 1) = "UAT CHECKLIST - $Name"
    $ws.Cells.Item($rowNum, 1).Font.Bold = $true
    $ws.Cells.Item($rowNum, 1).Font.Size = 14
    $rowNum++
    if ($Data -eq $null -or $Data.Count -eq 0) {
        $ws.Cells.Item($rowNum, 1) = "(No data)"
        $ws.Cells.Item($rowNum, 1).Font.Italic = $true
        return
    }
    foreach ($table in $Data) {
        if ($table.SubSection) {
            $rowNum++
            $ws.Cells.Item($rowNum, 1) = $table.SubSection
            $ws.Cells.Item($rowNum, 1).Font.Bold = $true
            $ws.Cells.Item($rowNum, 1).Font.Size = 11
            $rowNum++
        }
        $col = 1
        foreach ($h in $table.Headers) {
            $cell = $ws.Cells.Item($rowNum, $col)
            $cell.Value2 = $h
            $cell.Font.Bold = $true
            $cell.Interior.ColorIndex = 15
            $col++
        }
        $rowNum++
        foreach ($r in $table.Rows) {
            $col = 1
            foreach ($cellVal in $r) {
                $cell = $ws.Cells.Item($rowNum, $col)
                $cell.Value2 = $cellVal
                $cell.WrapText = $true
                $col++
            }
            $rowNum++
        }
    }
    $usedRange = $ws.UsedRange
    if ($usedRange -ne $null) {
        $usedRange.EntireColumn.AutoFit()
        for ($c = 1; $c -le 20; $c++) {
            $col = $ws.Columns.Item($c)
            if ($col.ColumnWidth -gt 80) { $col.ColumnWidth = 80 }
        }
    }
}

# Sheet 1: I. Trang User
$ws1 = $wb.Worksheets.Item(1)
$ws1.Name = "I. Trang User"
Add-SheetData -ws $ws1 -Name "I. Trang User" -Data $sectionData["I. Trang User"]

# Sheet 2: II. Auth
$ws2 = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count))
$ws2.Name = "II. Auth"
Add-SheetData -ws $ws2 -Name "II. Auth" -Data $sectionData["II. Auth"]

# Sheet 3: III. Admin
$ws3 = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count))
$ws3.Name = "III. Admin"
Add-SheetData -ws $ws3 -Name "III. Admin" -Data $sectionData["III. Admin"]

# Sheet 4: IV. Nen tang
$ws4 = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count))
$ws4.Name = "IV. Nen tang"
Add-SheetData -ws $ws4 -Name "IV. Nen tang" -Data $sectionData["IV. Nen tang"]

# Sheet 5: Summary
$ws5 = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count))
$ws5.Name = "Tong hop"
$rowNum = 1
$ws5.Cells.Item($rowNum, 1) = "TONG HOP UAT CHECKLIST"
$ws5.Cells.Item($rowNum, 1).Font.Bold = $true
$ws5.Cells.Item($rowNum, 1).Font.Size = 14
$rowNum++; $rowNum++
if ($summaryTable) {
    $col = 1
    foreach ($h in $summaryTable.Headers) { $cell = $ws5.Cells.Item($rowNum, $col); $cell.Value2 = $h; $cell.Font.Bold = $true; $cell.Interior.ColorIndex = 15; $col++ }
    $rowNum++
    foreach ($r in $summaryTable.Rows) { $col = 1; foreach ($cellVal in $r) { $ws5.Cells.Item($rowNum, $col).Value2 = $cellVal; $col++ }; $rowNum++ }
}
$ws5.UsedRange.EntireColumn.AutoFit()

# Sheet 6: Signature
$ws6 = $wb.Sheets.Add([System.Reflection.Missing]::Value, $wb.Sheets.Item($wb.Sheets.Count))
$ws6.Name = "Nguoi nghiem thu"
$rowNum = 1
$ws6.Cells.Item($rowNum, 1) = "NGUOI NGHIEM THU"
$ws6.Cells.Item($rowNum, 1).Font.Bold = $true
$ws6.Cells.Item($rowNum, 1).Font.Size = 14
$rowNum++; $rowNum++
$sigHeaders = @("Ho ten", "Vai tro", "Ngay", "Chu ky")
$col = 1
foreach ($h in $sigHeaders) { $cell = $ws6.Cells.Item($rowNum, $col); $cell.Value2 = $h; $cell.Font.Bold = $true; $cell.Interior.ColorIndex = 15; $col++ }
$rowNum++
foreach ($r in @(@("___________","___________","___________","___________"),@("___________","___________","___________","___________"))) {
    $col = 1; foreach ($cellVal in $r) { $ws6.Cells.Item($rowNum, $col).Value2 = $cellVal; $col++ }; $rowNum++
}
$ws6.UsedRange.EntireColumn.AutoFit()

$fullPath = (Get-Location).Path + "\$OutputFile"
$wb.SaveAs($fullPath, 51)
$wb.Close()
$excel.Quit()

[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws1) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws2) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws3) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws4) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws5) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ws6) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()

Write-Host "Done! Saved to: $fullPath"
