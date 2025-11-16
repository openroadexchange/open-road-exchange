
import React from 'react';
export default async function ItemPage({ params }){
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/inventory/${params.id}`);
  const item = await res.json();
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-bold">{item.title}</h2>
      <div className="mt-4">
        <img src={item.images && item.images[0] ? item.images[0].url : '/logo.svg'} alt={item.title} className="w-full h-96 object-cover rounded"/>
      </div>
      <div className="mt-4">{item.description}</div>
      <div className="mt-2 font-bold">${item.price}</div>
    </div>
  );
}
