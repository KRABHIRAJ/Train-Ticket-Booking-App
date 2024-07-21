import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="bg-white p-2">
        <div className="max-w-[1000px] m-auto flex justify-between items-center">
            <Link to="/">
                <div className="cursor-pointer">
                    <img className="h-[30px] object-cover" src="https://www.confirmtkt.com/img/brand/ctkt-logo-colour.png" alt="logo" />
                </div>
            </Link>
            <div className="flex items-center gap-x-5">
                <div className='cursor-pointer font-[600] text-[14px]'><p>FLIGHTS</p></div>
                <div className='cursor-pointer font-[600] text-[14px]'><p>HOTELS</p></div>
                <div className='flex items-center gap-x-1 cursor-pointer font-[600] text-[14px]'>
                    <AccountCircleIcon sx={{ color: '#BDBDBD', fontSize: 35 }} />
                    <p>LOGIN</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header