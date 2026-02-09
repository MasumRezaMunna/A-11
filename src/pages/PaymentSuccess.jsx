import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tutorId = searchParams.get("tutorId");

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "You have successfully hired the tutor.",
      confirmButtonColor: "#2563eb",
    }).then(() => {
      navigate("/dashboard");
    });
  }, [tutorId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex items-center justify-center bg-slate-50"
    >
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Processing...
        </h1>
        <p className="text-slate-500">Please do not close this window.</p>
      </div>
    </motion.div>
  );
}
