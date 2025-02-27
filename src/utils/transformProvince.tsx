const transformProvince = (province: string): string[] | string => {
 // remove accents
 const from =
   "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
  to =
   "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
 for (let i = 0, l = from.length; i < l; i++) {
  province = province.replace(RegExp(from[i], "gi"), to[i]);
 }

 province = province
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/-+/g, "-");

 let provinceArr = province.split("-");

 if (provinceArr.length === 4) {
  provinceArr = [provinceArr[2], provinceArr[3]];
 } else if (provinceArr.length === 3) {
  provinceArr = [provinceArr[1], provinceArr[2]];
 } else if (provinceArr.length === 5) {
  if (provinceArr[0] === "tinh") {
   provinceArr = [
    provinceArr[1],
    provinceArr[2],
    provinceArr[3],
    provinceArr[4],
   ];
  } else {
   provinceArr = [provinceArr[2], provinceArr[3], provinceArr[4]];
  }
 }

 provinceArr = provinceArr.map(
  (item) => item.charAt(0).toUpperCase() + item.slice(1)
 );

 const result = provinceArr.join(" ");

 return result;
};

export default transformProvince;
