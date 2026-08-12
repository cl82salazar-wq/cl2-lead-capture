(function () {
  "use strict";

  var SUPPORT_EMAIL = "cl82salazar@gmail.com";
  var SLA_HOURS = "24";
  var ETSY_SHOP_URL = ""; // TODO: paste Etsy shop URL
  var WEBSITE_URL = "https://cl2-smart-services.myshopify.com";
  // Free email inbox for leads (no Tally). Get key at https://web3forms.com → paste below.
  // Leave empty to keep JSON-download + optional mailto only.
  var WEB3FORMS_ACCESS_KEY = "";

  var form = document.getElementById("contact-form");
  if (!form) return;

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function markInvalid(id, bad) {
    var field = document.getElementById(id);
    if (!field) return;
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.toggle("invalid", !!bad);
  }

  function validate() {
    var ok = true;
    var name = val("name");
    var email = val("email");
    var help = val("help_with");
    var more = val("tell_us_more");
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    markInvalid("name", !name);
    markInvalid("email", !email || !emailOk);
    markInvalid("help_with", !help);
    markInvalid("tell_us_more", !more);

    if (!name || !email || !emailOk || !help || !more) ok = false;
    return ok;
  }

  function buildLead() {
    var now = new Date();
    return {
      form_version: "v1",
      source: "Website_form",
      status: "New",
      submitted_at: now.toISOString(),
      sla_hours: SLA_HOURS,
      name: val("name"),
      email: val("email"),
      what_can_we_help_with: val("help_with"),
      product_type: val("product_type") || "",
      quantity: val("quantity") || "",
      deadline: val("deadline") || "",
      tell_us_more: val("tell_us_more"),
      how_did_you_find_us: val("found_us") || "",
      anything_else: val("anything_else") || "",
      product_ref: (function () {
        try { return new URLSearchParams(window.location.search || "").get("ref") || ""; }
        catch (e) { return ""; }
      })(),
      file_note: "Static form: ask customer to email attachments to " + SUPPORT_EMAIL,
      owner: "CL",
      next_action: "Send human reply",
      support_email: SUPPORT_EMAIL
    };
  }

  function downloadJson(lead) {
    var stamp = lead.submitted_at.replace(/[:.]/g, "-");
    var safeName = (lead.name || "lead").replace(/[^\w\-]+/g, "_").slice(0, 40);
    var filename = "CL2-lead-" + safeName + "-" + stamp + ".json";
    var blob = new Blob([JSON.stringify(lead, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    return filename;
  }

  function buildMailto(lead) {
    var subject = "[CL2 Lead] " + lead.what_can_we_help_with + " — " + lead.name;
    var body = [
      "New website lead",
      "",
      "Name: " + lead.name,
      "Email: " + lead.email,
      "Help with: " + lead.what_can_we_help_with,
      "Product: " + (lead.product_type || "(blank)"),
      "Qty: " + (lead.quantity || "(blank)"),
      "Deadline: " + (lead.deadline || "(blank)"),
      "Found us: " + (lead.how_did_you_find_us || "(blank)"),
      "",
      "Message:",
      lead.tell_us_more,
      "",
      lead.anything_else ? ("Anything else:\n" + lead.anything_else + "\n") : "",
      "Submitted: " + lead.submitted_at,
      "",
      "→ Log on Leads tab: source = Website_form, status = New"
    ].join("\n");

    // Keep mailto under common length limits
    if (body.length > 1600) {
      body = body.slice(0, 1550) + "\n\n[truncated — see downloaded JSON]";
    }

    return "mailto:" + encodeURIComponent(SUPPORT_EMAIL)
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(body);
  }


  var PRODUCT_REF = {
    "mans-best-friend": {
      label: "Man's Best Friend - German Shepherd Unisex T-Shirt",
      url: "https://cl2-smart-services.myshopify.com/products/mans-best-friend-german-shepherd-unisex-t-shirt"
    },
    "loyal-like": {
      label: "Loyal Like a German Shepherd - Unisex T-Shirt",
      url: "https://cl2-smart-services.myshopify.com/products/loyal-like-a-german-shepherd-unisex-t-shirt"
    }
  };

  function setField(id, value) {
    var el = document.getElementById(id);
    if (!el || value == null || value === "") return;
    el.value = value;
  }

  function applyQueryPrefill() {
    var params;
    try {
      params = new URLSearchParams(window.location.search || "");
    } catch (err) {
      return;
    }
    var help = params.get("help");
    var product = params.get("product");
    var ref = params.get("ref");
    var qty = params.get("qty");
    var more = params.get("more");

    if (help) setField("help_with", help);
    if (product) setField("product_type", product);
    if (qty) setField("quantity", qty);

    var refInfo = ref ? PRODUCT_REF[ref] : null;
    if (refInfo) {
      if (!val("help_with")) setField("help_with", "Custom / personalized order");
      if (!val("product_type")) setField("product_type", "T-shirt");
      var seed = "Interested in: " + refInfo.label + "\n" + refInfo.url + "\n\n";
      var existing = val("tell_us_more");
      if (!existing) setField("tell_us_more", seed + "Sizes / colors / personalization:");
      else if (existing.indexOf(refInfo.url) === -1) setField("tell_us_more", seed + existing);
    }
    if (more && !val("tell_us_more")) setField("tell_us_more", more);

    // Soft-scroll to form when deep-linked
    if (help || product || ref || (window.location.hash || "") === "#contact") {
      var contact = document.getElementById("contact");
      if (contact && contact.scrollIntoView) {
        setTimeout(function () { contact.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
      }
    }
  }

  applyQueryPrefill();

  function finishSubmit(lead, filename) {
    try {
      sessionStorage.setItem("cl2_last_lead", JSON.stringify(lead));
      if (filename) sessionStorage.setItem("cl2_last_lead_file", filename);
    } catch (err) {
      /* private mode etc. */
    }

    var openMail = document.getElementById("also_mailto");
    if (openMail && openMail.checked) {
      window.location.href = buildMailto(lead);
      setTimeout(function () {
        window.location.href = "thank-you.html";
      }, 400);
      return;
    }

    window.location.href = "thank-you.html";
  }

  function submitViaWeb3Forms(lead) {
    var payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "[CL2 Lead] " + lead.what_can_we_help_with + " — " + lead.name,
      from_name: "CL2 Website",
      email: lead.email,
      name: lead.name,
      what_can_we_help_with: lead.what_can_we_help_with,
      product_type: lead.product_type,
      quantity: lead.quantity,
      deadline: lead.deadline,
      tell_us_more: lead.tell_us_more,
      how_did_you_find_us: lead.how_did_you_find_us,
      anything_else: lead.anything_else,
      source: lead.source,
      status: lead.status,
      submitted_at: lead.submitted_at,
      replyto: lead.email
    };

    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || (data && data.success === false)) {
          throw new Error((data && data.message) || "Web3Forms submit failed");
        }
        return data;
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
      if (firstBad) firstBad.focus();
      return;
    }

    var lead = buildLead();
    var btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
    }

    function unlock() {
      if (btn) {
        btn.disabled = false;
        btn.removeAttribute("aria-busy");
      }
    }

    // Prefer inbox delivery when key is set (unlocks leads without Tally).
    if (WEB3FORMS_ACCESS_KEY) {
      submitViaWeb3Forms(lead)
        .then(function () {
          finishSubmit(lead, "");
        })
        .catch(function () {
          // Fall back so a bad key never loses the lead
          var filename = downloadJson(lead);
          finishSubmit(lead, filename);
        })
        .then(unlock, unlock);
      return;
    }

    var filename = downloadJson(lead);
    finishSubmit(lead, filename);
    unlock();
  });

  // Expose config for thank-you page helpers
  window.CL2_FORM = {
    supportEmail: SUPPORT_EMAIL,
    slaHours: SLA_HOURS,
    etsyShopUrl: ETSY_SHOP_URL,
    websiteUrl: WEBSITE_URL,
    web3formsEnabled: !!WEB3FORMS_ACCESS_KEY,
    buildMailto: buildMailto
  };
})();
