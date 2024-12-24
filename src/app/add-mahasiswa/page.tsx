"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "../../../utils/supabase";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

export default function AddMahasiswa() {
    const [nim, setNim] = useState("");
    const [nama, setNama] = useState("");
    const [angkatan, setAngkatan] = useState("");
    const [prodi, setProdi] = useState("");
    const [foto, setFoto] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data, error} = await supabase
                .from("mahasiswa")
                .insert([
                    {
                        nim,
                        nama,
                        angkatan,
                        prodi,
                        foto
                    }
                ]);
            if (error) throw error;

            router.push("/"); 
            router.refresh(); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Tambah Data Mahasiswa</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">NIM</label>
                    <input 
                        type="text"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-gray-700"
                        required
                        placeholder="Masukkan NIM" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">Nama</label>
                    <input 
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-gray-700"
                        required
                        placeholder="Masukkan nama lengkap" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">Angkatan</label>
                    <input 
                        type="text"
                        value={angkatan}
                        onChange={(e) => setAngkatan(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-gray-700"
                        required
                        placeholder="Masukkan tahun angkatan" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">Prodi</label>
                    <input 
                        type="text"
                        value={prodi}
                        onChange={(e) => setProdi(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 text-gray-700"
                        required
                        placeholder="Masukkan program studi" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">Foto</label>
                    <CldUploadWidget
                        uploadPreset="grcyki1p"
                        onSuccess={(result) => {
                            // Type narrowing to handle both possible types of `result.info`
                            if (typeof result.info !== "string" && result.info?.public_id) {
                                setFoto(result.info.public_id);
                            } else {
                                console.error("Unexpected result structure", result);
                            }
                        }}
                    >
                        {({ open }) => {
                            return (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        open();
                                    }}
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-200 font-medium shadow-sm"
                                >
                                    Upload Foto
                                </button>
                            );
                        }}
                    </CldUploadWidget>
                    {foto && (
                        <p className="mt-2 text-sm text-green-600 font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19"></path>
                            </svg>
                            Foto berhasil diupload
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition duration-200 font-medium shadow-sm mt-4"
                >
                    Simpan Data
                </button>
            </form>
        </div>
    );
}
