"use client";

import UploadDocumentModal from "@/components/UploadDocumentModal";
import { useState, useEffect } from "react";
import axios from "axios";
import {
	Signature,
	UploadSimple,
	Pencil,
	ClockCounterClockwise,
	FilePdf
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const page = () => {
	const [uploadFile, setUploadFile] = useState(false);
	const [documents, setDocuments] = useState([]);
	const router = useRouter()

	useEffect(() => {
		async function fetchDocuments() {
			try {
				const response = await axios.get(`/api/documents`);
				setDocuments(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		}

		fetchDocuments();
	}, []);

	return (
		<div>
			{/* main application landing page */}

			<h1 className="Greetings" style={{ marginBottom: "30px" }}>
				Good morning, Marvel
			</h1>
			{/* Quick Actions */}
			<button style={{ marginBottom: "15px" }}>
				<div
					className="flex bg-gray-200 p-1 rounded-xl font-bold"
					style={{ fontSize: "12px" }}
				>
					<Pencil size={15} /> Quick Actions{" "}
				</div>
			</button>

			{/* signature element */}
			<div className="flex">
				<div className="flex">
					<button className="flex items-center px-4 py-2 bg-white text-black rounded-xl mr-5 ">
						<div className="bg-blue-200  rounded-md mr-1 px-3 py-1">
							<Signature size={50} className="w-5 h-7 text-blue-500" />
						</div>
						<div style={{ fontSize: "12px" }} className=" text-blue-700">
							Sign
						</div>
					</button>
				</div>

				{/* Document Upload element */}
				<div className="flex">
					<button
						className="flex items-center px-4 py-2 bg-white text-black rounded-xl mr-1 "
						onClick={() => setUploadFile(true)}
					>
						<div className="bg-blue-200 rounded-md mr-1 px-3 py-1">
							<UploadSimple size={24} className="w-5 h-7 text-blue-500" />
						</div>
						<div style={{ fontSize: "12px" }} className=" text-blue-700">
							{" "}
							Upload Document
						</div>
					</button>
					<UploadDocumentModal open={uploadFile} setOpen={setUploadFile} />
				</div>
			</div>
			{/* Recent */}
			<button style={{ marginTop: "15px" }}>
				<div
					className="flex bg-gray-200 p-1 rounded-xl font-bold"
					style={{ fontSize: "10px" }}
				>
					<ClockCounterClockwise size={15} /> Resents
				</div>
			</button>
			<UploadDocumentModal open={uploadFile} setOpen={setUploadFile} />

			{/*Display */}
			<div className="Display">
				
				<ul>
					{documents.map((doc, index) => (
						<li className="bg-white rounded-lg p-3 mb-2 flex items-center cursor" key={index} onClick={()=>{
							router.push('/app/preview')
						}}>
							<FilePdf size={40} /> <h3 className="Documents">{doc.name}</h3>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
export default page;
