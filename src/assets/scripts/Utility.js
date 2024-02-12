import Divisions from "../../assets/bangladesh-geojson/bd-divisions.json";
import Districts from "../../assets/bangladesh-geojson/bd-districts.json";
import Upazillas from "../../assets/bangladesh-geojson/bd-upazilas.json";
import PostCodes from "../../assets/bangladesh-geojson/bd-postcodes.json";

import countries from "../../assets/bangladesh-geojson/countries_data.json";
import categories from "../data/categroy.json";
import expenseType from "../data/expenseType.json";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import vendorData from "../data/vendor.json"
import employeeData from "../data/employee.json"
import Swal  from 'sweetalert2';

const getCountries = () => {
  return countries;
};

const isValidAddress = (
  divisionId,
  districtId,
  upazillaId,
  postID,
  PostCode
) => {
  const Division = Divisions.divisions.find((value) => value.id === divisionId);
  const District = Districts.districts.find((value) => value.id === districtId);
  const Upazilla = Upazillas.upazilas.find((value) => value.id === upazillaId);
  const PostOffice = PostCodes.postcodes.find(
    (value) => value.id.toString() === postID
  );
  if (
    Division &&
    District &&
    Upazilla &&
    PostOffice &&
    PostCode &&
    District.division_id === Division.id &&
    Upazilla.district_id === District.id &&
    PostOffice.district_id === District.id &&
    PostOffice.postCode === PostCode
  ) {
    return { Division, District, Upazilla, PostOffice };
  } else {
    return false;
  }
};
const getDivisions = () => {
  return Divisions.divisions.sort((a, b) => a.name.localeCompare(b.name));
};
const getAllDistricts = () => {
  return Districts.districts.sort((a, b) => a.name.localeCompare(b.name));
};

const getProvinceOfSelectedCity = (name) => {
  const districtID = Districts.districts.find((item) => item?.name === name);

  return Divisions.divisions.find((i) => i.id === districtID.division_id).name;
};
const getDistricts = (division_id) => {
  return Districts.districts.filter((i) => i.division_id === division_id);
};

const getUpazillas = (district_id) => {
  return Upazillas.upazilas.filter((i) => i.district_id === district_id);
};

const getPostOffices = (disctrict_id) => {
  return PostCodes.postcodes.filter((i) => i.district_id === disctrict_id);
};

export const getPostcode = (id) => {
  const selectedPostcode = PostCodes.postcodes.find(
    (postcode) => postcode.id.toString() === id.toString()
  );
  return selectedPostcode ? selectedPostcode.postCode : "";
};

const validateMobileNumber = (number) => {
  const regex = /^(?:\+88)?01[3-9][0-9]{8}$/;

  // Remove "+88" if it exists
  const formattedNumber = number.replace(/^\+88/, "");

  // Check if the formatted number matches the regex pattern
  return regex.test(formattedNumber);
};

const validateEmail = (email) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
};

const validPassword = (pass) => {
  // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(pass);
};

const fetchJson = async (path) => {
  try {
    const response = await fetch(path);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // If the response is not successful, return an empty array
      return false;
    }
  } catch (error) {
    // console.error('Error fetching data:', error);
    // Return an empty array in case of an error
    return false;
  }
};

const validateImage = (file) => {
  if (file && file[0]) {
    const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    const { type, size } = file[0];

    if (!supportedFormats.includes(type)) {
      return false;
      // return "Only JPEG, PNG, and GIF images are allowed.";
    }

    if (size > 3 * 1024 * 1024) {
      return false;
      // return "Image size should not exceed 3MB.";
    }
    return true;
  }
};

const getPcInfo = async () => {
  const response = await fetch("https://api64.ipify.org?format=json");
  const data = await response.json();

  console.log(data.ip);
  console.log("User Agent:", navigator.userAgent);
  console.log("App Name:", navigator.appName);
  console.log("Platform:", navigator.platform);
  console.log("Language:", navigator.language);
  console.log("Cookies Enabled:", navigator.cookieEnabled);

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // Dark mode is preferred
    console.log("Dark mode is enabled.");
  } else {
    // Light mode is preferred
    console.log("Light mode is enabled.");
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    });
  } else {
    console.log("Geolocation API not supported.");
  }

  if ("bluetooth" in navigator) {
    // Use the Web Bluetooth API here
  } else {
    console.log("Web Bluetooth API not supported.");
  }
};

const validateSalesTax = (value) => {
  if (isNaN(value)) {
    return "*is not a number";
  }

  const floatValue = parseFloat(value);

  if (floatValue < 0 || floatValue > 100) {
    return "Sales Tax must be between 0 and 100";
  }

  return true;
};

const getAllCategories = () => {
  return categories;
};

const getAllExpenseType = () => {
  return expenseType;
};

function getformatDate(inputDate) {
  // Define regular expression patterns for different date formats
  const patterns = [
    /(\d{1,2})[ -/](\d{1,2})[ -/](\d{4})/,
    /(\d{1,2})[ ]?([a-zA-Z]+)[ ]?(\d{4})/,
    /(\d{1,2})[ ]?([a-zA-Z]+)[ ]?(\d{2})/,
    /(\d{1,2})[ ]?(\d{1,2})[ ]?(\d{4})/,
    /(\d{2})(\d{2})(\d{4})/,
  ];

  // Loop through patterns and check for a match
  for (const pattern of patterns) {
    const match = inputDate.match(pattern);
    if (match) {
      // Format the matched components as DD/MM/YYYY
      const day = match[1].padStart(2, "0");
      const month = match[2].match(/\d+/)
        ? match[2].padStart(2, "0")
        : getMonthNumber(match[2].toLowerCase());
      const year = match[3].length === 2 ? "20" + match[3] : match[3];

      return `${year}-${month}-${day}`;
    }
  }

  return "Invalid date format";
}

function getMonthNumber(month) {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  if (String(months.indexOf(month) + 1).padStart(2, "0") == "00") {
    const fullMonths = [
      "janauary",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return String(fullMonths.indexOf(month) + 1).padStart(2, "0");
  }

  return String(months.indexOf(month) + 1).padStart(2, "0");
}

const disableScroll_Number_Input = e=>{
 e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })
}

const getVendor = () => {
  return vendorData;
}

const getEmployeeData = () => {
  return employeeData;
}

const SwalErrorShow = (e) => {
  Swal.fire({
    icon: "error",
    text: e?.code + " " + e?.message,
    title: e?.response?.data?.message,
  });
};

export {
  validateMobileNumber,
  validateSalesTax,
  validateEmail,
  fetchJson,
  validateImage,
  validPassword,
  getPcInfo,
  getCountries,
  isValidAddress,
  getDivisions,
  getDistricts,
  getUpazillas,
  getPostOffices,
  getAllDistricts,
  getProvinceOfSelectedCity,
  getAllCategories,
  getAllExpenseType,

  getVendor,
  getEmployeeData,

  getformatDate,
 disableScroll_Number_Input,
 SwalErrorShow
};
