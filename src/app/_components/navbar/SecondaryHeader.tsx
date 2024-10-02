import Link from 'next/link';
import React from 'react';
import LinkComponent from '../link/LinkComponent';
const SecondaryHeader = () => {
  const items = [
    { name: 'HTML', href: '/html' },
    { name: 'CSS', href: '/css' },
    { name: 'Javascript', href: '/javascript' },
    { name: 'MongoDB', href: '/mongodb' },
    { name: 'Nextjs', href: '/nextjs' },
    { name: 'Nodejs', href: '/nodejs' },
    { name: 'GSAP', href: '/gsap' },
    { name: 'React js', href: '/react' },
  ];
  return (
    <div className='border-2 border-t-primaryDark border-b-primaryDark py-1'>
      <ul className='flex-between container'>
        {items.map((item, index) => (
          <li key={index} className="secondaryHeading uppercase font-bold text-primaryDark">
            <LinkComponent href={item.href} text={item.name}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;
