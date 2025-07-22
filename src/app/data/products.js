import blender from "../assets/blender.webp";
import gasTove from "../assets/gasTove.jpg";
import Mixer from "../assets/Mixer.webp";
import refrigerator from "../assets/refrigerator.jpeg";
import Toaster from "../assets/Toaster.jpeg";

export const products = [
  {
    id: 1,
    title: "Philips HR3655/00",
    price: "459₾",
    description: "1400W, 2L, პლასტიკური ჯამი, 6 სიჩქარე",
    category: "ბლენდერი",
    seller: "გიორგი მ.",
    phone: "+995 555 123 456",
    location: "თბილისი, ვაკე",
    image: blender,
  },
  {
    id: 2,
    title: "Ariston A5G52F(W)",
    price: "899₾",
    description: "4 ტიტე, გაზზე მომუშავე, თეთრი ფერი",
    category: "გაზის ღუმელი",
    seller: "ანა ტ.",
    phone: "+995 555 234 567",
    location: "თბილისი, საბურთალო",
    image: gasTove,
  },
  {
    id: 3,
    title: "Bosch MFQ36460",
    price: "189₾",
    description: "450W, 5 სიჩქარე, თეთრი ფერი",
    category: "მიქსერი",
    seller: "დავით ლ.",
    phone: "+995 555 345 678",
    location: "თბილისი, მთაწმინდა",
    image: Mixer,
  },
  {
    id: 4,
    title: "LG GC-B247SLUV",
    price: "2,299₾",
    description: "335L, No Frost, ინვერტერი",
    category: "მაცივარი",
    seller: "ნათია კ.",
    phone: "+995 555 456 789",
    location: "თბილისი, ისანი",
    image: refrigerator,
  },
  {
    id: 5,
    title: "Tefal TT1102",
    price: "159₾",
    description: "2 ნაჭერი, 7 დონე, ვარდისფერი",
    category: "ტოსტერი",
    seller: "ლევან ბ.",
    phone: "+995 555 567 890",
    location: "თბილისი, გლდანი",
    image: Toaster,
  },
];
