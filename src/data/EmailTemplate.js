export const CUSTOMER_CONTRACT_RATE_DUE = 
    `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contract Rate Due Reminder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f7fa;
      font-family: Arial, sans-serif;
      color: #2d3748;
    }

    .container {
      max-width: 820px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 32px 36px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }

    .title {
      font-size: 24px;
      margin: 0 0 14px 0;
      font-weight: 700;
      color: #1a56db;
      letter-spacing: 0.3px;
    }

    .subtext {
      font-size: 15px;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      margin-top: 10px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
      padding: 12px 10px;
      border-bottom: 1px solid #e2e8f0;
      text-align: left;
      color: #2d3748;
    }

    td {
      padding: 11px 10px;
      border-bottom: 1px solid #edf2f7;
      color: #374151;
    }

    tr:nth-child(even) td {
      background: #fafbfc;
    }

    .footer {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
      margin-top: 26px;
      border-top: 1px solid #e5e7eb;
      padding-top: 16px;
    }
  </style>
</head>

<body>
  <div class="container">

    <h1 class="title">Contract Rate Due Reminder – {{ today_date }}</h1>

    <p class="subtext">
      This is a gentle reminder that the following <strong>contract rates</strong> are scheduled 
      to expire within the next <strong>{{ reminder_period }} day(s)</strong>.  
      Kindly review the details below and take the required action to avoid any disruption.
    </p>

    <table>
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th>Customer / Vendor</th>
          <th>Contract Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Rate Type</th>
        </tr>
      </thead>

      <tbody>
        {% for ct in contract_due_list %}
        <tr>
          <td>{{ forloop.counter }}</td>
          <td>{{ ct.customer.name }}</td>
          <td>{{ ct.product_category.name }}</td>
          <td>{{ ct.start_date|date:'d-m-Y' }}</td>
          <td>{{ ct.end_date|date:'d-m-Y' }}</td>
          <td>{{ ct.get_rate_type_display }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>

    <p class="footer">
      For any clarification or assistance regarding the contract renewal process,  
      please reach out to the concerned team. We are happy to support you.
    </p>

  </div>
</body>
</html>`

export const EMP_ATTENDANCE_ALERT =
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Attendance Notification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    @media only screen and (max-width:600px){
      .container { width:100% !important; padding:16px !important; }
      .header-text { font-size:20px !important; }
      .body-text { font-size:15px !important; }
      .footer-text { font-size:12px !important; }
    }
  </style>
</head>

<body style="margin:0; padding:0; background:#eef1f5; font-family:Arial, sans-serif;">

  <!-- Preheader -->
  <span style="display:none; opacity:0; height:0;">
    Attendance issues detected for {{name}} – action required.
  </span>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#eef1f5; padding:28px 12px;">
    <tr>
      <td align="center">

        <table class="container" width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:650px; background:#ffffff; border-radius:12px; border:1px solid #d9e2ec; overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a73e8; padding:22px; color:#ffffff;">
              <div class="header-text" style="font-size:22px; font-weight:700;">
                Attendance Alert – Action Required
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:26px; color:#2d3748; font-size:16px; line-height:1.7;" class="body-text">

              <div style="margin-bottom:14px;">
                Dear <strong>{{name}}</strong> ({{employee_id}}),
              </div>

              <div style="margin-bottom:20px; font-size:14px; color:#4a5568;">
                Below are your attendance compliance issues identified on
                <strong>{{report_date}}</strong>:
              </div>

              <!-- TABLE START -->
              <table width="100%" cellpadding="0" cellspacing="0" 
                     style="border-collapse:collapse; margin-bottom:24px; font-size:14px;">

                <tr>
                  <th style="padding:10px; border:1px solid #cbd5e1; background:#f1f5f9; text-align:left;">
                    Date
                  </th>
                  <th style="padding:10px; border:1px solid #cbd5e1; background:#f1f5f9; text-align:left;">
                    Issue
                  </th>
                </tr>

                {% for item in date_list %}

                <tr>
                  <td style="padding:10px; border:1px solid #e2e8f0;">
                    {{ item.date }}
                  </td>

                  {% if item.a_type == 'N' %}
                  <td style="padding:10px; border:1px solid #e2e8f0; color:#b91c1c; font-weight:600;">
                    No Attendance Recorded
                  </td>
                  {% else %}
                  <td style="padding:10px; border:1px solid #e2e8f0; color:#b45309; font-weight:600;">
                    {{ item.issue }}
                  </td>
                  {% endif %}
                </tr>

                {% endfor %}

              </table>
              <!-- TABLE END -->

              <!-- INFO BOX -->
              <div style="
                background:#ebf8ff;
                border:1px solid #90cdf4;
                padding:14px 16px;
                border-radius:6px;
                margin-top:10px;
                font-size:13px;
                color:#2f4858;">
                <strong>Note:</strong> This is an automated attendance compliance alert generated by Atomwalk HRM.
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f7fafc; padding:22px; border-top:1px solid #e2e8f0;">
              
              <div style="font-size:15px; color:#2d3748;">Regards,</div>

              <div style="font-size:16px; font-weight:700; margin-top:4px; color:#1a202c;">
                Atomwalk HRM – Compliance Notification Engine
              </div>

              <div class="footer-text" style="font-size:12px; color:#718096; margin-top:6px;">
                System-Generated Email · Do Not Reply
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`

export const MONTH_ATTENDANCE_ALERT =
    `<!doctype html>
<html>
  
  <body style="margin:0; padding:0; background:#f5f3ff; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <!-- MAIN CONTAINER -->
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:720px; background:#ffffff; border:1px solid #e4d9ff; border-radius:10px;">
            <!-- HEADER -->
            <tr>
              <td style="padding:18px 24px; background:#a78bfa; color:#ffffff; border-radius:10px 10px 0 0;">
                <div style="font-size:18px; font-weight:700; letter-spacing:0.3px;">
                  Monthly Attendance Compliance Summary
                </div>
                <div style="font-size:12px; opacity:0.95; margin-top:4px;">
                  Reporting Period: {{ start_date }} – {{ end_date }}
                </div>
              </td>
            </tr>
            <!-- BODY -->
            <tr>
              <td style="padding:24px; font-size:14px; color:#4b5563; line-height:1.65;">
                <p style="margin:0 0 14px 0;">
                  Dear HR Team,
                </p>
                <p style="margin:0 0 18px 0;">
                  Please find below the employee-wise attendance compliance summary for
                  the above reporting period. The summary highlights the count of missing
                  attendance entries and incomplete check-out records that require review
                  or regularisation.
                </p>
                <!-- SUMMARY TABLE -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:12px; font-size:13px;">
                  <tr style="background:#ede9fe;">
                    <th style="padding:10px; border:1px solid #d8ccff; text-align:left; color:#5b21b6;">
                      Employee Name
                    </th>
                    <th style="padding:10px; border:1px solid #d8ccff; text-align:left; color:#5b21b6;">
                      Employee ID
                    </th>
                    <th style="padding:10px; border:1px solid #d8ccff; text-align:center; color:#5b21b6;">
                      Missing Attendance
                    </th>
                    <th style="padding:10px; border:1px solid #d8ccff; text-align:center; color:#5b21b6;">
                      Missing Check-out
                    </th>
                  </tr>
                  {% for emp in employee_list %} {% for item in emp.date_list %} {% if item.a_type
                  == 'T' %}
                  <tr>
                    <td style="padding:9px; border:1px solid #e9e5ff;">
                      {{ emp.name }}
                    </td>
                    <td style="padding:9px; border:1px solid #e9e5ff;">
                      {{ emp.emp_id }}
                    </td>
                    <td style="padding:9px; border:1px solid #e9e5ff; text-align:center;">
                      {{ item.total_no_attendance }}
                    </td>
                    <td style="padding:9px; border:1px solid #e9e5ff; text-align:center;">
                      {{ item.total_no_checkout }}
                    </td>
                  </tr>
                  {% endif %} {% endfor %} {% endfor %}
                </table>
                <!-- ACTION REQUIRED -->
                <div style="
                margin-top:22px;
                padding:16px 18px;
                background:#fff4e5;
                border-left:5px solid #f59e0b;
                border-radius:8px;
                font-size:13.5px;
                color:#7c2d12;">
                  <strong style="font-size:14px;">
                    ⚠️ Action Required
                  </strong>
                  <br>
                  <br>
                  HR team is requested to review the above summary and initiate attendance
                  regularisation with the concerned employees through Atomwalk HRM.
                </div>
                <p style="margin:18px 0 0 0; font-size:13px; color:#6b7280;">
                  For detailed, date-wise attendance records, please log in to Atomwalk
                  HRM.
                </p>
              </td>
            </tr>
            <!-- FOOTER -->
            <!-- FOOTER -->
            <tr>
              <td style="padding:16px 24px; font-size:14px; color:#6b7280;
              border-top:1px solid #e4d9ff; background:#faf7ff;">
                Regards,
                <br>
                <strong style="color:#6d28d9;">
                  Atomwalk HRM – Compliance Notification Engine
                </strong>
                <br>
                <span style="font-size:13px; color:#7c7c9a;">
                  System-generated email · Please do not reply
                  <br>
                  If this message is not relevant to you, kindly ignore it.
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>

</html>`