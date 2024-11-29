import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../assets/css/componentsCSS/datatables.css";

const DataTable = React.memo(({ columns, data, onRowDoubleClick }) => {
  useEffect(() => {
    if (data.length === 0) return; // Chờ cho đến khi có dữ liệu

    const table = $("#data-table").DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 20,
      lengthChange: true,
      responsive: true,
      lengthMenu: [10, 20, 30, 40, 50],
      scrollY: "590px",
      scrollCollapse: true,
      language: {
        sProcessing: "Đang xử lý...",
        sLengthMenu: "Hiển thị _MENU_ bản ghi",
        sZeroRecords: "Không tìm thấy bản ghi nào phù hợp",
        sInfo: "Đang hiển thị _START_ đến _END_ trong tổng số _TOTAL_ bản ghi",
        sInfoEmpty: "Đang hiển thị 0 đến 0 trong tổng số 0 bản ghi",
        sInfoFiltered: "(được lọc từ _MAX_ bản ghi)",
        sSearch: "Tìm kiếm:",
        oPaginate: {
          sFirst: "Đầu",
          sPrevious: "Trước",
          sNext: "Tiếp",
          sLast: "Cuối",
        },
      },
      data: data, // Truyền dữ liệu vào DataTable
      columns: columns.map((col) => ({
        data: col.key, // Lấy trường dữ liệu từ `data` theo `key` của cột
        title: col.label,
      })),
    });

    // Cập nhật bảng khi dữ liệu thay đổi
    if (data.length > 0) {
      table.clear().rows.add(data).draw();
    }

    // Gắn sự kiện nhấn đúp chuột
    $("#data-table tbody").on("dblclick", "tr", function () {
      const rowIndex = table.row(this).index(); // Lấy chỉ số của hàng
      const rowData = data[rowIndex]; // Lấy toàn bộ dữ liệu từ mảng `data`
      if (onRowDoubleClick) {
        onRowDoubleClick(rowData); // Gọi callback với toàn bộ dữ liệu
      }
    });

    return () => {
      table.destroy(true); // Huỷ bảng khi component bị hủy
      $("#data-table tbody").off("dblclick", "tr"); // Gỡ bỏ sự kiện
    };
  }, [data, columns, onRowDoubleClick]);

  return (
    <table id="data-table" className="display" style={{ width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default DataTable;
