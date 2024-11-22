import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../assets/css/componentsCSS/datatables.css";

const DataTable = ({ data, columns }) => {
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
    });

    return () => {
      table.destroy(true);
    };
  }, [data]);

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
};

export default DataTable;
