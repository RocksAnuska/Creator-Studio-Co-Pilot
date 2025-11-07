import React from 'react';

const Card = ({ title, description, icon }) => {
    return (
        <span className="bg-gradient text-blue border-2 h-[350px] w-[600px] gap-6 p-8 rounded-2xl flex w-full bg-gradient border-blue-200 hover:shadow-lg hover:shadow-blue-200/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col space-y-2">
                <h2 className='text-blue text-xl font-semibold'>{title}</h2>
                <p className="text-gray-700">{description}</p>
            </div>
            {/* <p>{icon}</p> */}
        </span>
    );
};

export default Card;