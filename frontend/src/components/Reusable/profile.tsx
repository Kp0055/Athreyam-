import React from "react";

const Profile = ({
    name,
    profession,
    imgSrc,
    className,
    flexDirection = 'col', // Default to column if not specified
  }: {
    name: string;
    profession: string;
    imgSrc: string;
    className: string;
    flexDirection?: 'col' | 'row'; // Optional prop
  }) => (
    <div className={`${className} flex flex-${flexDirection} items-center`}> {/* Adjust flex direction based on prop */}
      <img className="w-28 rounded-full hover:cursor-pointer" src={imgSrc} alt={`${name}'s profile`} />
      <div className={`ml-2 ${flexDirection === 'row' ? 'flex flex-col' : ''}`}> {/* Wrap name and profession in a div */}
        <h1 className="font-semibold">{name}</h1>
        <h2 className="mb-2">{profession}</h2>
      </div>
    </div>
  );
  

export default Profile;
