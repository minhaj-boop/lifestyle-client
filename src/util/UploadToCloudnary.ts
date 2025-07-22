export const uploadToCloudinary = async (pics: any) => {
    const cloud_name = "dioqmvlql"
    const upload_preset = "life_style"

    if(pics) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: data,
        });
        const fileData = await res.json();
        return fileData.url;

    } else {
        console.error("No image provided for upload.");
    }
}