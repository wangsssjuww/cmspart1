// "use client";
// import { CldImage } from 'next-cloudinary';
// import { useState } from 'react';
// import Link from 'next/link';

// // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
// export default function CardMahasiswa(props) {
//     const {nim, nama, angkatan, prodi, foto} = props;
//     const [angka, setAngka] = useState(0)

//     console.log(nim);
//     const handleClick = () => {
//       setAngka(angka + 1)
//     }
//   return (
//     <div className="p-2 m-2 border border-slate-300 rounded-lg grid justify-items-center text-slate-700">
//         <CldImage className='rounded-full'
//         src={foto} // Use this sample image or upload your own via the Media Explorer
//         width="500" // Transform the image: auto-crop to square aspect_ratio
//         height="500"
//         crop={{
//             type: 'auto',
//             source: true
//         }}
//     />
//     <h1 className="text-xl font-semibold">{nama}</h1>
//         <p>NIM      : {nim}</p>
//         <p>Angkatan : {angkatan}</p>
//         <p>Prodi    : {prodi}</p>
//         <Link rel='text-purple-800 underline' href={`/nilai/${nim}`}>Lihat Nilai</Link>
//         <div className='m-2'>
//           <button className='px-2 bg-blue-500 rounded rounded-lg text-slate-10' onClick={handleClick}>
//             counter
//           </button>
//           <p>{angka}</p>
//         </div>
//     </div>
//   );
// }

"use client";
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function CardMahasiswa(props) {
    const { nim, nama, angkatan, prodi, foto } = props;

    return (
        <>
            <div className='p-2 m-2 border border-slate-400 rounded-lg grid justify-items-center text-slate-700'>
                <CldImage className='rounded-full'
                    src={foto} // Use this sample image or upload your own via the Media Explorer
                    width="75" // Transform the image: auto-crop to square aspect_ratio
                    height="75"
                    crop={{
                        type: 'auto',
                        source: true
                    }}
                />
                <h1 className="text-xl font-semibold">{nama}</h1>
                <p>NIM      : {nim}</p>
                <p>Angkatan : {angkatan}</p>
                <p>Prodi    : {prodi}</p>
                <Link className='text-purple-800 underline hover:text-blue-800 mt-2'
                    href={`/nilai/${nim}`}>
                    Lihat Nilai
                </Link>
                <Link className='text-purple-800 underline hover:text-blue-800 mt-2'
                    href={`/add-mahasiswa`}>
                    Upload Data
                </Link>



                {/* <div className='bg-blue-600 text-white border 
                            rounded-lg p-2 mt-2'>
                <Link href={`/mahasiswa/${nim}`}>
                    Lihat Detil
                </Link>
            </div> */}
            </div>

        </>
    );
}