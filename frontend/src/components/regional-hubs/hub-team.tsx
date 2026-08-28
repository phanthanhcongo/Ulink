import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface TeamMember {
  id: string;
  name: string;
  roleKey: string;
  photo: string;
}

export default async function HubTeam() {
  const t = await getTranslations('regionalHubs');

  const members: TeamMember[] = [
    {
      id: 'kenny',
      name: 'Kenny Tran',
      roleKey: 'hubTeam.role1',
      photo: '/images/regional_hubs/hub-2/KennyTran.png'
    },
    {
      id: 'hai',
      name: 'Hải Nguyễn',
      roleKey: 'hubTeam.role2',
      photo: '/images/regional_hubs/hub-2/HaiNguyen.png'
    },
    {
      id: 'quang',
      name: 'Quang Trần',
      roleKey: 'hubTeam.role3',
      photo: '/images/regional_hubs/hub-2/QuangTran.png'
    },
    {
      id: 'hung',
      name: 'Minh Hưng',
      roleKey: 'hubTeam.role4',
      photo: '/images/regional_hubs/hub-2/MinhHung.png'
    }
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 flex flex-col items-center gap-12 lg:gap-16">
        
        {/* Header */}
        <div className="text-center max-w-[800px] w-full">
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-extrabold text-slate-900 leading-tight uppercase tracking-tight">
            {t('hubTeam.title')}
          </h2>
          <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[720px] mx-auto">
            {t('hubTeam.desc')}
          </p>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center group">
              
              {/* Photo */}
              <div className="relative w-full aspect-square overflow-hidden mb-5 bg-slate-50 border border-slate-100/50">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-[#1A1A1A] leading-snug mb-1">
                {member.name}
              </h3>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-700 font-normal mb-4">
                {t(member.roleKey)}
              </p>

              {/* Social Media Row */}
              <div className="flex items-center justify-center gap-3 mb-5 mt-1">
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="hover:scale-105 transition-transform text-[#0A66C2]">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                
                {/* TikTok */}
                <a href="#" aria-label="TikTok" className="hover:scale-105 transition-transform flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M19.2 8.51c-1.32-.09-2.5-.68-3.35-1.58v6.23c0 3.65-2.95 6.6-6.6 6.6-3.65 0-6.6-2.95-6.6-6.6 0-3.65 2.95-6.6 6.6-6.6.14 0 .28 0 .42.02v3.32c-.14-.02-.28-.02-.42-.02-1.82 0-3.3 1.48-3.3 3.3s1.48 3.3 3.3 3.3 3.3-1.48 3.3-3.3V1h3.3c.09 1.82 1.48 3.3 3.3 3.3v3.31a6.38 6.38 0 0 1-.77.9z" fill="#25F4EE" />
                    <path d="M18.43 8.51c-1.32-.09-2.5-.68-3.35-1.58v6.23c0 3.65-2.95 6.6-6.6 6.6-3.65 0-6.6-2.95-6.6-6.6 0-3.65 2.95-6.6 6.6-6.6.14 0 .28 0 .42.02v3.32c-.14-.02-.28-.02-.42-.02-1.82 0-3.3 1.48-3.3 3.3s1.48 3.3 3.3 3.3 3.3-1.48 3.3-3.3V1.77h3.3c.09 1.82 1.48 3.3 3.3 3.3v3.31c-.26.06-.52.09-.77.13z" fill="#FE2C55" />
                    <path d="M18.8 8.51c-1.32-.09-2.5-.68-3.35-1.58v6.23c0 3.65-2.95 6.6-6.6 6.6-3.65 0-6.6-2.95-6.6-6.6 0-3.65 2.95-6.6 6.6-6.6.14 0 .28 0 .42.02v3.32c-.14-.02-.28-.02-.42-.02-1.82 0-3.3 1.48-3.3 3.3s1.48 3.3 3.3 3.3 3.3-1.48 3.3-3.3V1.38h3.3c.09 1.82 1.48 3.3 3.3 3.3v3.31a5.4 5.4 0 0 1-.77.15z" fill="black" />
                  </svg>
                </a>

                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="hover:scale-105 transition-transform text-[#E1306C]">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="hover:scale-105 transition-transform text-[#1877F2]">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="border border-[#0066FF] text-[#0066FF] text-[13px] sm:text-[14px] leading-relaxed font-bold py-2.5 px-8 rounded-none hover:bg-[#0066FF]/5 transition-colors w-[150px] inline-flex justify-center items-center mt-2 min-h-[44px]"
              >
                {t('hubTeam.contact')}
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
