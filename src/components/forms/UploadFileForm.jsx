// App.jsx or RegisterForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

// 1. Zod Schema with File Validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  avatar: z
    .any() // accept anything first
    .refine((files) => files?.length === 1, "Profile picture is required.")
    .refine((files) => files?.[0]?.size <= 5000000, "Max file size is 5MB.")
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function UploadForm() {
  const [preview, setPreview] = useState(null);
//   const [upload, setUpload] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  // Watch file to show preview
  const avatarFile = watch("avatar");
  // Show preview when file is selected
  useEffect( () => {
    if (avatarFile && avatarFile[0]) {
      const file = avatarFile[0];
    //   setUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [avatarFile]);
//   logic add file to api or backend
  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("file", data.avatar[0]);
    // console.log("The data of formData: ", formData);

    const res = await fetch('https://api.escuelajs.co/api/v1/files/upload',{
        method: "POST", 
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // }, 
        body: data?.file[0]
    }); 

    if(res.ok){
        console.log("Upload image successfully")
    }else{
        console.log("Please try again!")
    }

    // Simulate upload
    // await new Promise((r) => setTimeout(r, 1500));
    // console.log("Uploaded:", Object.fromEntries(formData));
    // alert("Profile created successfully!");
  };
  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", border: "1px solid #ddd" }}>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div style={{ marginBottom: "1rem" }}>
          <input {...register("name")} placeholder="Full Name" style={{ width: "100%", padding: "10px" }} />
          {errors.name && <p style={{ color: "red", margin: "5px 0" }}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <input {...register("email")} type="email" placeholder="Email" style={{ width: "100%", padding: "10px" }} />
          {errors.email && <p style={{ color: "red", margin: "5px 0" }}>{errors.email.message}</p>}
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Profile Picture <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("avatar")}
            style={{ display: "block", marginBottom: "10px" }}
          />
                    {preview && (
            <div style={{ margin: "10px 0" }}>
              <img src={preview} alt="Preview" style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "50%" }} />
            </div>
          )}
          {errors.avatar && <p style={{ color: "red", margin: "5px 0" }}>{errors.avatar.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 30px",
            background: isSubmitting ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isSubmitting ? "Uploading..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
}




