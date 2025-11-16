
'use client';
import useSWR from 'swr';
import Link from 'next/link';
const fetcher = (url) => fetch(url).then(r=>r.json());
export default function InventoryPage(){
  const {data, error} = useSWR('/api/inventory', fetcher);
  if(error) return <div>Error loading inventory</div>;
  if(!data) return <div>Loading...</div>;
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-2xl font-bold">Inventory</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map(item=>(
          <div key={item.id} className="border p-4 rounded">
            <img src={item.images && item.images[0] ? item.images[0].url : '/logo.svg'} alt={item.title} className="w-full h-40 object-cover rounded"/>
            <h3 className="font-semibold mt-3">{item.title}</h3>
            <div className="text-sm text-slate-600">{item.year} • {item.miles}</div>
            <div className="mt-2 font-bold">${item.price}</div>
            <div className="mt-3">
              <Link href={'/inventory/' + item.id} className="text-sky-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
