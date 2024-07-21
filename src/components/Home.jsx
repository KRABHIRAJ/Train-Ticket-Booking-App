import { FeatureCard, TrainSearch } from "../components";
import { featureCardDetails } from "../utils/constants/constant";

function Home() {
  return (
    <div>
      <div className="max-w-[1000px] m-auto">
        <div>
          <p className="font-[700] text-[#42A047] text-center text-[30px] pt-10">
            Fastest Train Ticket Booking
          </p>
          <p className="text-center text-[18px]">Easy IRCTC Login</p>
        </div>
        <div className="search__component">
          <TrainSearch />
        </div>
        <div className="banner__image flex justify-center mt-8">
          <img
            src="https://cdn.confirmtkt.com/img/rcb_banners/desktop_rcb_banner.png"
            alt="banner"
            height={250}
            width={320}
          />
        </div>
        <div className="flex gap-x-1 justify-center items-center my-4">
          <img
            width="32"
            height="32"
            src="https://www.confirmtkt.com/img/icons/ic-search-irctc.png"
            alt="IRCTC"
          />
          <p>IRCTC Authorised Partner</p>
        </div>

        <div>
          <p className="font-[600] text-[28px] mb-4">Why Book IRCTC Train Ticket on ConfirmTkt</p>
          <div className="grid grid-cols-2">
            {
              featureCardDetails.map((featureCard) => {
                return <FeatureCard key={featureCard?.heading} card = {featureCard}/>
              })
            }
          </div>
        </div>
      </div>
      <div className="relative pt-32">
        <div className="bg-[#CFE6CD] p-8 flex justify-end pr-32">
          <img width="650" height="206" loading="lazy" src="https://cdn.confirmtkt.com/img/banner/trusted_by_with_ratings.png" alt="trusted" />
        </div>
        <div className="absolute top-10 left-[20%]">
          <img width="234" height="451" loading="lazy" src="https://cdn.confirmtkt.com/img/mobile_app_view.png" alt="Home Screen Mobile app" />
        </div>
      </div>
    </div>
  );
}

export default Home;
