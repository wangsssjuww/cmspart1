import CardMahasiswa from "../../../../components/CardMahasiswa";
import supabase from "../../../../../utils/supabase";

export const revalidate = 0;

export default async function GetMahasiswaByNim({ params }) {
    const {data: nilai, error} = await supabase.form("nilai").select(`
        nilai,semester,
        matakuliah(kdmk,matakuliah,sks)
    `).eq('nim', nim).eq('semester', semester);
    if (error) {
        console.log(error);
    }
    console.log(nilai);
    
    const { data: mahasiswa, err} = await supabase.from("mahasiswa").select(`
        *
    `).eq('nim',nim);
    if (err) {
        console.log(err)
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-600 ml-2" >Semester Mahasiswa</h1>
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
        </div>
    );
}
