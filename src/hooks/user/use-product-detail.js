import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "@/store/use-product-store";
import useWebInfoStore from "@/store/use-web-info-store";
import { toast } from "react-toastify";
import useAuthStore from "@/store/use-auth-store";

const useProductDetail = () => {
  const { webInfo } = useWebInfoStore();
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const product = useProductStore((state) => state.selectedProduct);
  const { id } = useParams();
  const navigate = useNavigate();

  // Inisialisasi Varian pertama sebagai default
  useEffect(() => {
    if (product.variants.length > 0) {
      setSelectedSize(product.variants[0].name);
    }
  }, [product]);

  // Temukan varian yang dipilih
  const selectedVarian = product.variants.find(
    (variant) => variant.name === selectedSize,
  );

  const totalPrice = selectedVarian ? selectedVarian.price * quantity : 0;

  const openWhatsApp = () => {
    if (webInfo && webInfo.whatsapp) {
      const message = encodeURIComponent(
        `Halo! Saya ingin memesan kue:\n` +
          `Nama: ${user.name}\n` +
          `Kue: ${product.name}\n` +
          `Varian: ${selectedSize}\n` +
          `Jumlah: ${quantity}`,
      );
      window.open(
        `https://wa.me/${webInfo.whatsapp}?text=${message}`,
        "_blank",
      );
    } else {
      toast.error("Nomor WhatsApp tidak tersedia.", {
        position: "top-right",
      });
    }
  };

  return {
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    product,
    id,
    navigate,
    selectedVarian,
    totalPrice,
    openWhatsApp,
  };
};

export default useProductDetail;
