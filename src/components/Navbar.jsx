import dayjs from 'dayjs';


import {navIcons, navLinks} from '#constants/index.js'
const Navbar = () => {

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">BB's Portfolio</p>
                <ul>
                    {navLinks.map(({id, name}) => (
                        <li key={id}><p>{name}</p></li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                       <img src={img} className="icon-hover" alt={`icon-${id}`} />
                    ))}
                </ul>

                <time>{dayjs().format('ddd MMM D YYYY h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar
