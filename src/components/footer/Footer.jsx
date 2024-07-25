export const Footer = () => {
    const openLinkedIn = () => {
        window.open(
            'https://www.linkedin.com/in/krabhiraj'
          );
    }
  return (
    <div className="p-2">
        <p className="font-[500] text-center">Developed by <span className="cursor-pointer text-[#48A04D]" onClick={openLinkedIn}>Abhiraj kumar</span></p>
    </div>
  )
}
