import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Choose a username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Create a password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Sign Up
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <button className="text-blue-600" type="button" >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
