"use client";

import NavbarLayout from "~/components/modules/navbar-layout";
import FAQSection from "~/components/modules/faq";
import RegisterButton from "~/components/modules/register-button";
import { SponsorsGrid } from "~/components/modules/sponsors";
import ScheduleTimeline from "~/components/schedule-timeline";
import VolunteerSection from "~/components/modules/volunteer-section";
import TeamSection from "~/components/modules/team-section";
import { hackathonEvents } from "~/data/schedule";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="h-full w-full pb-24">
      <NavbarLayout className="h-screen py-0">
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="flex scale-90 transform flex-col items-center px-4 text-center sm:scale-100">
            <svg
              className="h-40 w-40 2xl:h-72 2xl:w-72"
              width="178"
              height="156"
              viewBox="0 0 178 156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100.196 99.9757C100.9 103.025 105.218 103.095 106.019 100.069L107.357 95.0209C107.705 93.7054 108.896 92.7893 110.257 92.7893H151.894C154.207 92.7893 155.65 95.2979 154.487 97.2979L127.961 142.893C127.424 143.816 126.436 144.385 125.368 144.385H52.9671C51.8559 144.385 50.8357 143.77 50.3158 142.788L49.0072 140.316C48.5293 139.414 48.5435 138.33 49.0448 137.44L73.3397 94.3168C73.8714 93.3731 74.8704 92.7893 75.9535 92.7893H96.1511C97.5481 92.7893 98.7602 93.7535 99.0743 95.1147L100.196 99.9757ZM63.1618 21.5016C63.764 22.4369 63.7992 23.6286 63.2534 24.5979L49.0663 49.787C48.5533 50.6979 48.5515 51.8102 49.0614 52.7227L54.9521 63.2639C56.079 65.2805 58.9668 65.3201 60.1486 63.3351L71.5634 44.1628C72.74 42.1864 75.6115 42.2149 76.7488 44.2142L83.4096 55.9244C83.9362 56.8501 83.9324 57.9857 83.3998 58.908L44.9894 125.416C43.8741 127.347 41.1162 127.43 39.8877 125.568L32.877 114.946C32.2498 113.996 32.2146 112.772 32.7863 111.788L47.3599 86.6804C47.9039 85.7434 47.9003 84.5859 47.3506 83.6522L40.6718 72.309C39.4964 70.3126 36.598 70.3453 35.4678 72.3677L25.0795 90.9573C23.9665 92.9489 21.1258 93.0186 19.9167 91.0839L13.017 80.0445C12.4276 79.1014 12.4083 77.9097 12.9668 76.9479L50.2936 12.6714C50.8305 11.7469 51.8188 11.178 52.8879 11.178H54.8786C55.8987 11.178 56.8488 11.6963 57.401 12.554L63.1618 21.5016ZM85.866 109.988C84.7747 109.988 83.7695 110.58 83.2411 111.535L77.3133 122.247C76.2068 124.246 77.6529 126.699 79.9382 126.699H89.475C91.3841 126.699 92.8076 124.94 92.4088 123.073L90.1209 112.361C89.8252 110.977 88.6024 109.988 87.187 109.988H85.866ZM117.987 109.988C116.653 109.988 115.48 110.868 115.107 112.149L111.987 122.86C111.428 124.78 112.868 126.699 114.867 126.699H115.19C116.235 126.699 117.204 126.156 117.749 125.265L124.301 114.553C125.524 112.554 124.085 109.988 121.742 109.988H117.987ZM96.0736 78.9262C97.1801 80.9258 95.734 83.3788 93.4487 83.3788H84.5374C82.2036 83.3788 80.7635 80.8312 81.9671 78.8317L86.61 71.1185C87.8009 69.14 90.687 69.1926 91.8051 71.2131L96.0736 78.9262ZM120.462 78.8317C121.666 80.8312 120.226 83.3788 117.892 83.3788H109.702C108.618 83.3788 107.619 82.7948 107.088 81.8508L101.056 71.1392C99.9297 69.1393 101.375 66.6672 103.67 66.6672H111.444C112.497 66.6672 113.472 67.2185 114.015 68.12L120.462 78.8317ZM135.09 24.3799C136.227 26.3798 134.783 28.8631 132.482 28.8631H122.081C119.769 28.8631 118.326 31.369 119.487 33.369L145.895 78.873C147.056 80.873 145.613 83.3788 143.301 83.3788H131.43C130.354 83.3788 129.36 82.802 128.826 81.8673L99.4014 30.3747C98.8673 29.44 97.8733 28.8631 96.7967 28.8631H79.3386C78.2673 28.8631 77.2773 28.2919 76.7412 27.3644L69.9874 15.6792C68.8315 13.6792 70.2748 11.178 72.5848 11.178H125.835C126.914 11.178 127.91 11.7571 128.443 12.6947L135.09 24.3799ZM164.832 76.95C165.372 77.9118 165.341 79.0924 164.751 80.0242L163.509 81.984C162.959 82.8525 162.003 83.3788 160.975 83.3788H156.328C155.213 83.3788 154.189 82.7598 153.671 81.7718L148.055 71.0602C147.008 69.0626 148.457 66.6672 150.712 66.6672H157.301C158.385 66.6672 159.385 67.2525 159.916 68.1981L164.832 76.95Z"
                fill="black"
              />
              <path
                d="M46.4125 0.220505C45.1368 0.632629 44.0967 1.24101 43.3313 2.04565C42.5659 2.83066 0.744428 74.6199 0.273421 75.9741C-0.119085 77.0338 -0.0798341 79.4281 0.332297 80.4486C0.999557 82.1168 42.6052 152.709 43.4098 153.553C43.8416 154.004 44.7443 154.613 45.4116 154.927L46.6087 155.476H89.2937C130.821 155.476 131.998 155.456 133.058 155.103C135.433 154.279 134.393 155.947 156.962 116.716C168.227 97.1301 177.588 80.7626 177.725 80.3309C177.882 79.9188 178 78.8982 178 78.074C178 76.7591 177.921 76.3862 177.333 75.2087C176.96 74.4433 167.618 57.9384 156.55 38.5094C142.635 14.0759 136.159 2.8699 135.531 2.16341C134.981 1.55502 134.157 0.927002 133.49 0.593384L132.371 0.043869L89.7843 0.00462341C55.7541 -0.0149994 47.0405 0.0242462 46.4125 0.220505ZM130.939 5.81371C131.272 5.95108 136.551 15.0572 151.8 41.8457C163.026 61.5495 172.23 77.8385 172.269 78.0347C172.328 78.388 131.645 149.255 131.213 149.53C131.096 149.608 112.275 149.687 89.3722 149.687C49.9843 149.687 47.7274 149.667 47.433 149.333C46.9227 148.764 5.69 78.4665 5.69 78.1721C5.69 77.6815 47.4526 5.95108 47.8255 5.79408C48.3554 5.59782 130.409 5.59782 130.939 5.81371Z"
                fill="black"
              />
            </svg>
            <h1 className="mt-3 font-hexaframe text-4xl font-extrabold sm:text-6xl md:text-7xl 2xl:text-8xl">
              Hack The Burgh
            </h1>
            <p className="mt-6 max-w-3xl px-2 text-center text-sm sm:text-base 2xl:max-w-4xl 2xl:text-2xl">
              Ready to build something amazing? Hack The Burgh is back for its
              12th year! Join us in Edinburgh for a weekend of coding and
              creativity, no matter your experience level.
            </p>
            <RegisterButton />
          </div>
        </div>
      </NavbarLayout>
      <NavbarLayout>
        <div id="schedule" className="px-4 pb-10 sm:pb-16">
          <h1 className="font-hexaframe text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Schedule
          </h1>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-1.5 w-1.5 bg-black sm:h-2 sm:w-2" />
            <p className="text-xs uppercase text-gray-500 sm:text-sm">
              Discover the hackathon will unfold.
            </p>
          </div>
        </div>
        <ScheduleTimeline events={hackathonEvents} />
        <p className="mt-2 text-center text-xs text-gray-500">
          Scroll to see the full schedule
        </p>
      </NavbarLayout>
      <NavbarLayout>
        <div id="sponsors" className="px-4 pb-10 sm:pb-16">
          <h1 className="font-hexaframe text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Our Sponsors
          </h1>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-1.5 w-1.5 bg-black sm:h-2 sm:w-2" />
            <p className="text-xs uppercase text-gray-500 sm:text-sm">
              Meet the amazing organisations that make Hack the Burgh possible.
            </p>
          </div>
        </div>
        <SponsorsGrid />
      </NavbarLayout>
      <NavbarLayout>
        <TeamSection />
      </NavbarLayout>
      <div className={`w-full py-10 md:py-24 md:pl-[4.2rem] md:pr-[1.25rem]`}>
        <FAQSection />
      </div>

      <NavbarLayout className="flex h-screen items-center">
        <VolunteerSection />
      </NavbarLayout>
    </main>
  );
}
