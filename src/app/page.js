import SearchForm from "../components/SearchForm";
import supabase from "../../utils/supabase";
import CardMahasiswa from "../components/CardMahasiswa";

export const revalidate = 20;

export default async function Home() {
  const { data: mahasiswa, error } = await supabase.from("mahasiswa").select("").order('id', { ascending: true });
  console.log(mahasiswa);

  if (error) {
    console.log(error);
  }

  return(
    <div>
      <h1 className="text-xl font-semibold text-slate-700 ml-2"> Daftar Mahasiswa</h1>
      <SearchForm/>
      <div className="flex p-4">
        {mahasiswa && mahasiswa.map((mhs,idx) =>
          <CardMahasiswa 
            key = {idx}
            nim={mhs.nim}
            nama={mhs.nama}
            angkatan={mhs.angkatan}
            prodi={mhs.prodi}
            foto={mhs.foto}
          />
        )}
      </div>
    </div>
  );
}

// "use client"; // Indicate this is a Client Component

// import { useState, useEffect } from "react"; // Import useEffect
// import supabase from "../../utils/supabase";
// import CardMahasiswa from "@/components/CardMahasiswa";

// export default function Home() {
//   const [mahasiswa, setMahasiswa] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const { data, error } = await supabase
//         .from("mahasiswa")
//         .select("")
//         .order("id", { ascending: true });
//       if (error) {
//         console.log(error);
//       } else {
//         setMahasiswa(data);
//       }
//     }
//     fetchData();
//   }, []);

//   // Filter mahasiswa based on search input
//   const filteredMahasiswa = mahasiswa.filter((mhs) =>
//     mhs.nim.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <div className="flex flex-col p-2">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Cari NIM..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />

//         {/* Display filtered mahasiswa */}
//         <div className="flex flex-wrap">
//           {filteredMahasiswa.map((mhs, idx) => (
//             <CardMahasiswa
//               key={idx}
//               nim={mhs.nim}
//               nama={mhs.nama}
//               angkatan={mhs.angkatan}
//               prodi={mhs.prodi}
//               foto={mhs.foto}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
