import CardMahasiswa from "../../../components/CardMahasiswa";
import supabase from "../../../../utils/supabase";

export const revalidate = 0;

export default async function GetMahasiswaByNim({ params }) {
    const { nim } = params;
    const { data: mahasiswa, error } = await supabase.from("mahasiswa").select('').eq("nim", nim);
    console.log(mahasiswa);

    if (error) {
        console.log(error);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-600 ml-2" >Daftar Mahasiswa</h1>
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

