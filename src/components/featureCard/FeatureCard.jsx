/* eslint-disable react/prop-types */
const FeatureCard = ({card}) => {
  return (
    <div className="flex gap-x-3 items-center p-4 m-4 shadow-sm rounded-lg">
        <img src={card?.icon} loading="lazy" alt={card?.heading} width={50} height={50}/>
        <div>
            <h3 className="font-[600]">{card?.heading}</h3>
            <p className="text-[14px] text-[#858585]">{card?.subHeading}</p>
        </div>
    </div>
  )
}

export default FeatureCard