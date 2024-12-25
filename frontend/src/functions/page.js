// utils/pagePath.js
export const getPagePath = () => {
  if (window.location.pathname.includes("/men")) {
    return "/men";  // หรือ "men" ถ้าต้องการให้เป็นแค่ส่วนเส้นทาง
  } else if (window.location.pathname.includes("/women")) {
    return "/women";
  } else {
    return "";  // ค่าเริ่มต้นถ้าไม่ตรงกับเงื่อนไข
  }
};



export const redirectToPage = (pageName) => {
  if (!pageName) {
    console.error("Page name is required!");
    return;
  }

  window.location.href = `/${pageName}.html`;
};


