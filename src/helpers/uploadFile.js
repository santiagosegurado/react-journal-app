


export const uploadFile = async(file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dpi1phz6t/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-joarnal');
    formData.append('file', file);


    try {
        
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })        

        if (resp.ok) {
            
            const cloudResp = resp.json();
            return cloudResp

        } else {
            throw await resp.json();
        }


    } catch (error) {
        throw error;
    }

}
