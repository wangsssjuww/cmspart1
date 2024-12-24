// import CardMahasiswa from "@/components/CardMahasiswa";
// import supabase from "../../../../utils/supabase";

// export const revalidate = 0;

// export default async function NilaiByNim({params}) {
//     const {nim} = params
//     const { data: mahasiswa, error } = await supabase.from("mahasiswa").select('').eq('nim',nim);
//     console.log(mahasiswa);
    
//     if (error) {
//         console.log(error);
//     }

//     return (
//         <div>
//             <h1 className="text-xl font-semibold text-slate-700 ml-2"> Nilai Mahasiswa </h1>
//             <div className="flex"> 
//                 {mahasiswa.map((mhs,idx) => (
//                 <CardMahasiswa
//                     key = {idx}
//                     nim = {mhs.nim}
//                     nama = {mhs.nama}
//                     angkatan = {mhs.angkatan}
//                     prodi = {mhs.prodi}
//                     foto = {mhs.foto}
//                 />
//                 ))}
//             </div>
//         </div>
//     )
// }

import CardMahasiswa from "../../../components/CardMahasiswa";
import supabase from "../../../../utils/supabase";

export const revalidate = 0;

export default async function NilaiByNim({ params }) {
    const { nim } = params
    const { data: mahasiswa, error } = await supabase.from("mahasiswa").select('').eq('nim', nim);
    console.log(mahasiswa);

    if (error) {
        console.log(error);
    }

    const { data: nilai, err } = await supabase.from("nilai").select('').eq('nim', nim);
    console.log(mahasiswa);

    if (err) {
        console.log(err);
    }
    
    return (
        <div>
            <h1 className="text-xl font-semibold text-slate-700 ml-2" >Nilai Mahasiswa</h1>
            <div className="flex">
                {mahasiswa.map((mhs, idx) => (
                    <CardMahasiswa
                        key={idx}
                        nim={mhs.nim}
                        nama={mhs.nama}
                        angkatan={mhs.angkatan}
                        prodi={mhs.prodi}
                        foto={mhs.foto}
                    />
                ))}
            </div>
            <div className="mt-4 ml-8">
                <h3 className="text-lg font-semibold text-blue-600">Daftar Nilai</h3>
                {nilai.map((nil, idx) => 
                    <div key={idx} className="mt-2">
                        <h2 className="text-sm font-semibold">{nil.matakuliah.matakuliah}</h2>
                        <li className="text-sm ml-4">Kode PK : {nil.matakuliah.kdmk}</li>
                        <li className="text-sm ml-4">SKS : {nil.matakuliah.sks}</li>
                        <li className="text-sm ml-4">Semester : {nil.semester}</li>
                        <li className="text-sm ml-4">Nilai : {nil.nilai}</li>
                    </div>
                )}
            </div>
        </div>
    );
}