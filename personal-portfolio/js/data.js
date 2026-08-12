const PORTFOLIO_DATA = {
  profile: {
    name: "rd.newlab",
    fullname: "rd.newlab",
    title: "Kỹ Sư R&D & Tự Động Hóa Quy Trình",
    bio: "Kỹ sư đam mê công nghệ, không ngừng cải tiến quy trình và liên tục học hỏi. Chuyên sâu nghiên cứu phát triển công thức Mỹ phẩm, Hóa mỹ phẩm, Thực phẩm; đặc biệt yêu thích Hóa học, Toán - Vật lý và có sự am hiểu sâu sắc về thiết bị máy móc công nghiệp. Tích hợp kỹ năng thiết kế bản vẽ kỹ thuật AutoCAD/Visio, lập trình hệ thống tự động hóa (Google Sheets, Apps Script, Auto App) và ứng dụng trí tuệ nhân tạo (AI) để giải quyết tối ưu mọi bài toán thực tế trong nhà máy sản xuất.",
    avatar: "", // Để trống để tự động render avatar đồ họa vector phát sáng hoặc ảnh mặc định
    contact: {
      email: "rd.newlab@gmail.com / softwarefull2023@gmail.com",
      phone: "0902 620 715 / 0943 156 780",
      zalo: "https://zalo.me/0902620715", // Thay thế bằng link Zalo của bạn
      github: "https://github.com/",
      address: "TP. Hồ Chí Minh, Việt Nam"
    }
  },
  
  // Lĩnh vực chuyên môn R&D
  expertises: [
    {
      id: "cosmetics",
      title: "Mỹ Phẩm",
      icon: "🧪",
      desc: "Nghiên cứu và phát triển công thức mỹ phẩm (skincare, haircare, makeup). Tối ưu hóa tính ổn định, độ an toàn và cảm quan sản phẩm theo tiêu chuẩn CGMP.",
      tags: ["Skincare", "Haircare", "CGMP", "Công thức tối ưu"]
    },
    {
      id: "food",
      title: "Thực Phẩm",
      icon: "🥦",
      desc: "Phát triển công thức thực phẩm chức năng, thực phẩm bảo vệ sức khỏe và đồ uống. Định lượng giá trị dinh dưỡng, kiểm soát chất lượng và tối ưu hóa giá thành.",
      tags: ["Thực phẩm chức năng", "Dinh dưỡng", "HACCP", "Tối ưu giá"]
    },
    {
      id: "pharma",
      title: "Dược Phẩm",
      icon: "💊",
      desc: "Nghiên cứu công thức bào chế thuốc, thực phẩm bảo vệ sức khỏe dạng viên nang, viên nén, siro. Đảm bảo tính sinh khả dụng và tuân thủ chuẩn GMP-WHO.",
      tags: ["Bào chế học", "GMP-WHO", "FEFO theo lô", "Dược điển"]
    },
    {
      id: "chemical",
      title: "Hóa Mỹ Phẩm",
      icon: "🧼",
      desc: "Thiết kế công thức các sản phẩm tẩy rửa gia dụng, nước giặt, nước rửa chén, chất hoạt động bề mặt. Đảm bảo hiệu quả làm sạch tối đa và thân thiện môi trường.",
      tags: ["Chất tẩy rửa", "Chất hoạt động bề mặt", "An toàn môi trường"]
    }
  ],

  // Các kỹ năng kỹ thuật & tự động hóa
  skills: [
    { name: "Thiết kế Công thức & R&D", level: 95, category: "rd" },
    { name: "Quản lý Hệ thống Chất lượng GMP/ISO", level: 92, category: "rd" },
    { name: "Thiết kế Hệ thống Google Sheets / Excel nâng cao", level: 95, category: "tech" },
    { name: "Thiết kế Bản vẽ kỹ thuật (AutoCAD & Visio)", level: 90, category: "tech" },
    { name: "Nghiên cứu & Ứng dụng AI vào Công việc", level: 88, category: "tech" },
    { name: "Lập trình Google Apps Script / Automation", level: 90, category: "tech" },
    { name: "Tự động hóa xử lý dữ liệu và File (Autofile)", level: 92, category: "tech" }
  ],

  // Kho ứng dụng tự động hóa (Portfolio)
  projects: [
    {
      id: "auto-rd",
      title: "Auto RD (V12)",
      category: "app",
      icon: "🧬",
      subtitle: "Hệ Thống R&D & Quản Lý Công Thức",
      image: "images/autord.png",
      desc: "Phần mềm chuyên dụng cho bộ phận R&D mỹ phẩm, thực phẩm và dược phẩm. Hỗ trợ tự động tính toán tỷ lệ % thành phần, quy đổi đơn vị đo lường quốc tế (IU sang mg, thể tích sang khối lượng theo tỷ trọng), tự động tính giá thành công thức thời gian thực, thiết lập định mức nguyên liệu và xuất bản in PDF/Excel tiêu chuẩn.",
      features: [
        "Tính toán tỷ lệ % nguyên liệu tự động",
        "Quy đổi đơn vị thông minh (IU, Lít, Kg, Tỷ trọng)",
        "Tính giá thành công thức tức thời theo đơn giá nguyên liệu",
        "Xuất file PDF bản in A4 và file Excel xuất khẩu chuẩn công thức"
      ],
      demoLink: "#",
      badge: "Đã hoàn thành"
    },
    {
      id: "auto-khvt",
      title: "Auto KHVT (V5)",
      category: "app",
      icon: "📊",
      subtitle: "Kế Hoạch Vật Tư & Quản Lý Lô FEFO",
      image: "images/autokhvt.png",
      desc: "Ứng dụng quản lý chuỗi vật tư khép kín cho nhà máy sản xuất dược phẩm và thực phẩm. Tự động chạy thuật toán tính dự trù nguyên vật liệu (NVL) dựa trên đơn hàng và định mức BOM, theo dõi tồn kho thực tế theo từng lô nội bộ, tự động xuất kho theo nguyên tắc FEFO (hạn dùng trước xuất trước), quản lý lệnh sản xuất và xuất kho bán hàng.",
      features: [
        "Thuật toán tính toán dự trù NVL tự động từ BOM",
        "Theo dõi tồn kho theo Lô (Batch) & Ngày hết hạn (HSD)",
        "Quản lý vòng đời đơn hàng: PO -> Dự trù -> Lệnh sản xuất -> Xuất bán",
        "Kiến trúc module tách biệt dễ bảo trì và mở rộng"
      ],
      demoLink: "#",
      badge: "Đang triển khai"
    },
    {
      id: "auto-box",
      title: "Auto Box (V16)",
      category: "app",
      icon: "📦",
      subtitle: "Tối Ưu Hóa Kích Thước Hộp & Xếp Hàng",
      image: "images/autobox.png",
      desc: "Giải pháp tính toán tự động kích thước hộp carton tối ưu dựa trên kích thước sản phẩm. Hỗ trợ thuật toán sắp xếp 3D (3D Bin Packing) giúp tối đa hóa thể tích sử dụng trong thùng hàng, container và tối ưu hóa diện tích chất xếp hàng hóa tại kho bãi, giảm thiểu chi phí đóng gói vận chuyển.",
      features: [
        "Thuật toán tính kích thước hộp tối thiểu",
        "Mô phỏng sắp xếp sản phẩm vào hộp 3D",
        "Giảm 15-20% chi phí thùng carton và không gian lưu kho",
        "Giao diện tương tác trực quan dễ sử dụng"
      ],
      demoLink: "#",
      badge: "Đã hoàn thành"
    },
    {
      id: "autofile",
      title: "Autofile (V23)",
      category: "automation",
      icon: "📂",
      subtitle: "Tự Động Hóa Xử Lý File Dữ Liệu Lớn",
      image: "images/autofile.png",
      desc: "Ứng dụng chuyên biệt để xử lý hàng loạt file Excel, CSV, PDF. Tự động gộp dữ liệu từ hàng trăm file đơn lẻ, trích xuất thông tin theo từ khóa/mẫu định trước, định dạng lại bảng biểu, tự động đổi tên file hàng loạt và đẩy dữ liệu lên Google Drive/Database tự động.",
      features: [
        "Gộp hàng trăm file Excel/CSV chỉ với 1 click",
        "Trích xuất dữ liệu thông minh theo mẫu (Template)",
        "Tự động hóa chuyển đổi định dạng và dọn dẹp dữ liệu (data cleaning)",
        "Tích hợp báo cáo tự động bằng biểu đồ trực quan"
      ],
      demoLink: "#",
      badge: "Đã hoàn thành"
    },
    {
      id: "auto-qc",
      title: "Auto QA-QC (V3)",
      category: "automation",
      icon: "🔍",
      subtitle: "Kiểm Soát Chất Lượng Nhà Máy",
      image: "images/autoqc.png",
      desc: "Ứng dụng số hóa và tự động hóa quy trình kiểm soát chất lượng QA-QC phòng thí nghiệm và dây chuyền sản xuất. Hỗ trợ lưu trữ COA điện tử, quản lý lưu mẫu phòng Lab, theo dõi hành động khắc phục CAPA và cảnh báo sai lệch tự động chuẩn GMP/ISO.",
      features: [
        "Lập và xuất phiếu kiểm nghiệm chất lượng (COA) tự động",
        "Hệ thống theo dõi mẫu lưu phòng Lab và hạn hủy mẫu",
        "Lập phiếu kiểm tra công đoạn IPQC trên dây chuyền sản xuất",
        "Báo cáo thống kê tỷ lệ lỗi và lỗi lặp lại theo lô"
      ],
      demoLink: "#",
      badge: "Đang triển khai"
    },
    {
      id: "auto-sx",
      title: "Auto SX (V5)",
      category: "app",
      icon: "⚙️",
      subtitle: "Điều Phối & Kế Hoạch Sản Xuất",
      image: "", // Không có hình ảnh poster
      desc: "Hệ thống hỗ trợ lập kế hoạch sản xuất, điều phối công việc cho các tổ sản xuất (pha chế, định liều, dập viên, đóng gói). Tự động phân công nhân sự, quản lý công suất máy móc thiết bị, tính toán hao hụt thực tế và đo lường hiệu suất thiết bị tổng thể (OEE).",
      features: [
        "Tự động lập lịch sản xuất cho các tổ phân xưởng dựa trên lệnh sản xuất",
        "Quản lý định mức hao hụt và cảnh báo lãng phí nguyên vật liệu",
        "Theo dõi và báo cáo năng suất thực tế theo giờ của từng chuyền",
        "Tích hợp đo lường hiệu suất thiết bị tổng thể (OEE) tự động"
      ],
      demoLink: "#",
      badge: "Sắp bàn giao"
    }
  ],

  // Thư viện tài liệu chia sẻ từ Google Drive
  documents: [
    {
      id: "doc-legal-1",
      title: "Nghị định 155/2018/NĐ-CP & Quy định điều kiện sản xuất Mỹ phẩm, Dược phẩm",
      category: "legal",
      format: "PDF",
      size: "3.2 MB",
      desc: "Văn bản quy định chi tiết về điều kiện đầu tư kinh doanh, cấp phép cơ sở sản xuất và kiểm soát chất lượng cơ sở sản xuất mỹ phẩm, dược phẩm hiện hành.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 1120
    },
    {
      id: "doc-legal-2",
      title: "Hướng dẫn thực hành tốt sản xuất mỹ phẩm ASEAN (CGMP ASEAN Guidelines)",
      category: "legal",
      format: "PDF",
      size: "4.5 MB",
      desc: "Tài liệu hướng dẫn tiêu chuẩn thực hành tốt sản xuất mỹ phẩm của Hiệp hội các quốc gia Đông Nam Á, phục vụ thiết lập hệ thống kiểm soát chất lượng chất lượng.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 1450
    },
    {
      id: "doc-research-1",
      title: "Tài liệu kỹ thuật đánh giá độ ổn định của sản phẩm R&D (Stability Testing Manual)",
      category: "research",
      format: "PDF",
      size: "2.8 MB",
      desc: "Cẩm nang hướng dẫn phương pháp kiểm tra độ ổn định lý hóa, hạn dùng và tương thích bao bì của công thức mỹ phẩm & thực phẩm phòng thí nghiệm.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 920
    },
    {
      id: "doc-research-2",
      title: "Báo cáo ứng dụng hoạt chất sinh học tự nhiên thế hệ mới trong Hóa mỹ phẩm",
      category: "research",
      format: "PDF",
      size: "5.1 MB",
      desc: "Nghiên cứu khoa học tổng hợp cơ chế hoạt động, tỷ lệ sử dụng tối ưu và thử nghiệm lâm sàng của các hoạt chất sinh học nguồn gốc tự nhiên.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 840
    },
    {
      id: "doc-design-1",
      title: "Template Excel thiết kế công thức và tự động lập định mức BOM vật tư",
      category: "design",
      format: "XLSX",
      size: "1.8 MB",
      desc: "Bảng tính mẫu thông minh giúp tự động quy đổi đơn vị đo lường, tính toán tỷ lệ % hoạt chất và tự động lập bảng định mức nguyên vật liệu sản xuất.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 2150
    },
    {
      id: "doc-design-2",
      title: "Bảng tra cứu tỷ trọng R&D và quy đổi Đơn vị đo lường thể tích sang khối lượng",
      category: "design",
      format: "XLSX",
      size: "1.1 MB",
      desc: "Ứng dụng bảng tính tự động tra cứu tỷ trọng của hơn 500 nguyên liệu và công thức quy đổi nhanh lít sang kg ngành Dược.",
      driveLink: "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
      downloads: 1680
    }
  ]
};

// Export dữ liệu nếu dùng ES6 Modules (ở đây ta khai báo biến toàn cục để chạy trực tiếp trên HTML/JS tĩnh cho đơn giản)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
