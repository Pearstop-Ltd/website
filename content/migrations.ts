export interface MigrationFaqItem {
  q: string;
  a: string;
}

export interface MigrationProof {
  stat: string;
  label: string;
}

export interface MigrationLink {
  href: string;
  label: string;
}

interface MigrationEntryBase {
  slug: string;
  vendorGroup: string;
  /** Short display name used inline in copy, e.g. "S/4HANA", "Business Central". */
  system: string;
  /** The standard Pearstop classifies against for this page's copy. */
  standard: "UNSPSC" | "ECLASS";
  title: string;
  metaDescription: string;
  h1: string;
  /** System-specific points under "The data that matters in a [system] migration". */
  dataFocus: string[];
  /** 2-3 system-specific checklist items, added to the shared good-data list. */
  goodData: string[];
  faqs: MigrationFaqItem[];
  proof?: MigrationProof;
  relatedSlugs: string[];
  status: "published" | "draft";
}

export interface MigrationRouteEntry extends MigrationEntryBase {
  kind: "migration";
  /** The deadline or growth trigger, one or two sentences, no invented dates. */
  trigger: string;
  triggerDateSource?: string;
  /** The page's three pains, in the buyer's words. */
  pains: string[];
}

export interface EclassRouteEntry extends MigrationEntryBase {
  kind: "eclass";
  /** Opening paragraph(s) replacing the trigger — what the page is about. */
  intro: string;
  /** The three-step "How classification to ECLASS works" section. */
  howClassificationSteps: Array<{ title: string; body: string }>;
}

export type MigrationEntry = MigrationRouteEntry | EclassRouteEntry;

export const migrationEntries: MigrationEntry[] = [
  // ---------------------------------------------------------------------
  // SAP
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "sap-ecc-to-s4hana",
    vendorGroup: "SAP",
    system: "S/4HANA",
    standard: "UNSPSC",
    title: "Clean your data before your S/4HANA migration",
    metaDescription:
      "SAP ECC mainstream maintenance ends 2027. Clean and classify your vendor and material data before it moves into S/4HANA.",
    h1: "Clean your purchase data before your S/4HANA migration",
    trigger:
      "SAP ECC 6.0 mainstream maintenance ends on 31 December 2027, with extended maintenance available to the end of 2030. SAP has said there will be no general extension beyond that, so most ECC customers now have a firm window to plan their move.",
    triggerDateSource: "https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/",
    pains: [
      "Every supplier and customer has to become a single business partner record in S/4HANA, and duplicate or incomplete vendor records block that conversion outright.",
      "Years of material master records carry inconsistent descriptions and material groups, built up by whoever happened to create each one.",
      "Deciding what history to bring across and what to archive is hard to do well when nobody can tell which records are still active.",
    ],
    dataFocus: [
      "Business partner conversion: vendors and customers merge into one business partner model, and every record needs to pass that conversion cleanly.",
      "Material master data and material groups, which carry whatever inconsistencies built up over the life of your ECC system.",
      "Whether you're running a greenfield, brownfield or selective approach changes how much data actually needs cleaning before it moves.",
      "Open items versus history: what stays live in the new system and what gets archived.",
    ],
    goodData: [
      "Every vendor clean enough to convert to a business partner without manual rework.",
      "Material groups consistent and mapped to one standard.",
    ],
    faqs: [
      {
        q: "Do we need to clean vendor data before converting to business partners in S/4HANA?",
        a: "Yes. Business partner conversion merges every vendor and customer record into a single model, and duplicate or incomplete vendor records will block or corrupt that conversion, so cleaning them first avoids redoing the conversion later.",
      },
      {
        q: "Should we clean data before or after moving to S/4HANA?",
        a: "Before. Cleaning after go-live means reporting is unreliable from day one and the cleanup still has to happen, just under more pressure and inside a live system.",
      },
      {
        q: "How do we keep spend reporting comparable after the migration?",
        a: "Classify every spend line to one standard, such as UNSPSC, before it moves, so category totals in S/4HANA match what your old system reported and nothing has to be reconciled after go-live.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/eclass/eclass-sap-s4hana",
      "/migrations/sap-business-one-to-s4hana-cloud",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "sap-business-one-to-s4hana-cloud",
    vendorGroup: "SAP",
    system: "S/4HANA Cloud",
    standard: "UNSPSC",
    title: "Clean your data before moving off SAP Business One",
    metaDescription: "Outgrowing SAP Business One? Clean item and supplier data before it moves into S/4HANA Cloud.",
    h1: "Clean your purchase data before you outgrow SAP Business One",
    trigger:
      "There's no fixed retirement date for SAP Business One. The trigger is usually growth: more entities, more countries, or more users than the system was set up to handle comfortably.",
    pains: [
      "Item and supplier records were built up without standards while the company grew, so nobody agreed a shared format for them.",
      "Each entity kept its own item groups, so the same category means something different depending on which entity entered it.",
      "Spend can't be compared across entities before the move, because there's no shared classification underneath the numbers.",
    ],
    dataFocus: [
      "Item master and item groups, which usually diverge the most between entities that grew up separately.",
      "Supplier records across entities, often duplicated under slightly different names or details.",
      "Choosing a category standard before loading the new system, rather than carrying forward whatever each entity happened to use.",
    ],
    goodData: [
      "One supplier record across entities, not one per entity.",
      "Item groups mapped to one standard, not one per entity.",
    ],
    faqs: [
      {
        q: "When have we outgrown SAP Business One?",
        a: "Usually when the number of entities, countries or users has grown past what the system was configured for, and reporting across entities has become a manual, spreadsheet-based exercise rather than something the system does for you.",
      },
      {
        q: "What data should we clean before moving off Business One?",
        a: "Item and supplier records across every entity, so duplicates are merged and every entity's categories map to the same standard before anything loads into the new system.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/spend-cube",
      "/migrations/sap-ecc-to-s4hana",
    ],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Microsoft Dynamics
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "dynamics-nav-to-business-central",
    vendorGroup: "Microsoft Dynamics",
    system: "Business Central",
    standard: "UNSPSC",
    title: "Clean your data before moving NAV to Business Central",
    metaDescription:
      "Dynamics NAV extended support ends 2027-2028. Clean vendor and item data before it moves into Business Central.",
    h1: "Clean your purchase data before your Dynamics NAV migration",
    trigger:
      "Microsoft's extended support for Dynamics NAV 2017 ends on 12 January 2027, and for NAV 2018 on 12 January 2028. After that, Microsoft stops releasing security updates for those versions.",
    triggerDateSource: "https://learn.microsoft.com/en-us/lifecycle/products/dynamics-nav-2017",
    pains: [
      "Many teams move only master data and open balances, so years of purchase history stay behind in the old system, unclassified and hard to reach.",
      "Item categories and vendor records were never kept consistent, so what looks like one category is really several, spelled differently.",
      "Old customisations stored data in non-standard places that the standard migration path doesn't know to look at.",
    ],
    dataFocus: [
      "Vendors and items, which carry most of the inconsistency built up over years of manual entry.",
      "Item categories, which need mapping to one standard before they can be compared across years.",
      "Which history to keep for reporting, given the standard tools move master data and open balances rather than everything.",
      "Data held in customisations, which needs identifying before anyone can decide what to do with it.",
    ],
    goodData: [
      "Item categories consistent and mapped to one standard.",
      "Purchase history classified and kept reportable even where it isn't migrated into Business Central itself.",
    ],
    faqs: [
      {
        q: "Can we keep our NAV purchase history when we move to Business Central?",
        a: "The standard migration path moves master data and open balances, not full purchase history, so if you want that history to stay usable it needs classifying and archiving separately rather than assuming it will simply come along.",
      },
      {
        q: "What should we clean before migrating from NAV?",
        a: "Vendor records and item categories first, since those are what determine whether spend reporting in Business Central lines up with what NAV used to show.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/dynamics-gp-to-business-central",
      "/migrations/dynamics-ax-2012-to-d365-fscm",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "dynamics-ax-2012-to-d365-fscm",
    vendorGroup: "Microsoft Dynamics",
    system: "Dynamics 365",
    standard: "UNSPSC",
    title: "Clean your data before moving AX 2012 to Dynamics 365",
    metaDescription: "Dynamics AX 2012 R3 extended support ended January 2023. Clean procurement data before Dynamics 365.",
    h1: "Clean your purchase data before your Dynamics AX 2012 migration",
    trigger:
      "Microsoft's extended support for Dynamics AX 2012 R3 ended on 11 January 2023. Companies still running it are already past the point of receiving security updates.",
    triggerDateSource: "https://learn.microsoft.com/en-us/lifecycle/products/dynamics-ax-2012-r3",
    pains: [
      "Running an unsupported system means years of customised data are sitting on a platform Microsoft no longer patches.",
      "Procurement category hierarchies grew ad hoc across business units, so the same spend can sit under different categories depending on who set them up.",
      "Supplier and product records are spread across legal entities, often duplicated under different names in each one.",
    ],
    dataFocus: [
      "The procurement category hierarchy, which usually needs consolidating onto one standard rather than carried forward as-is.",
      "Vendors in the global address book across legal entities, where duplicates are common.",
      "Products and released products, which need checking for consistency before they move.",
      "Choosing between a data upgrade and a fresh start changes how much of this needs doing, and when.",
    ],
    goodData: [
      "One procurement category hierarchy mapped to UNSPSC.",
      "Vendors de-duplicated across legal entities.",
    ],
    faqs: [
      {
        q: "Should we upgrade our AX 2012 data or start fresh in Dynamics 365?",
        a: "Either path benefits from cleaning first: a data upgrade carries forward the same inconsistencies unless they're fixed beforehand, and a fresh start still needs someone to decide which of the old records are worth re-entering.",
      },
      {
        q: "How do we clean procurement categories before moving to D365?",
        a: "Map every existing category, across every legal entity, to a single standard such as UNSPSC before the move, so spend reporting in the new system is comparable across entities from day one.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/dynamics-nav-to-business-central",
      "/migrations/dynamics-gp-to-business-central",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "dynamics-gp-to-business-central",
    vendorGroup: "Microsoft Dynamics",
    system: "Business Central",
    standard: "UNSPSC",
    title: "Clean your data before moving GP to Business Central",
    metaDescription:
      "Dynamics GP mainstream support ends 2029. Clean vendor and item data before it moves into Business Central.",
    h1: "Clean your purchase data before your Dynamics GP migration",
    trigger:
      "Microsoft's mainstream support for Dynamics GP ends on 31 December 2029, with security updates continuing to 30 April 2031.",
    triggerDateSource: "https://learn.microsoft.com/en-us/lifecycle/products/dynamics-gp",
    pains: [
      "Microsoft's migration tools focus on master data and open transactions, so detailed history needs a separate decision about what to keep.",
      "GP vendor and item records have accumulated duplicates over the years, often under near-identical names.",
      "Account structures don't map one-to-one, so what GP tracked as an account, Business Central may track as a dimension.",
    ],
    dataFocus: [
      "Vendors and items, where duplicate records are the most common problem after years of manual entry.",
      "Historical transactions and what to keep, since the standard migration tools don't bring across everything.",
      "Account segments versus dimensions in Business Central, which need mapping rather than assumed to be equivalent.",
    ],
    goodData: [
      "Vendors de-duplicated before the move.",
      "Historical spend classified so it stays usable after go-live.",
    ],
    faqs: [
      {
        q: "When does Dynamics GP support end?",
        a: "Mainstream support ends 31 December 2029, and security updates continue until 30 April 2031, according to Microsoft's published lifecycle policy.",
      },
      {
        q: "What happens to our GP history when we move to Business Central?",
        a: "Microsoft's standard migration path moves master data and open transactions. Detailed historical spend needs classifying and archiving separately if you want it to stay reportable after the move.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/dynamics-nav-to-business-central",
      "/migrations/dynamics-ax-2012-to-d365-fscm",
    ],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Oracle
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "oracle-ebs-to-fusion",
    vendorGroup: "Oracle",
    system: "Oracle Fusion",
    standard: "UNSPSC",
    title: "Clean your data before moving EBS to Oracle Fusion",
    metaDescription: "Moving from Oracle E-Business Suite to Fusion? Clean purchasing categories and supplier data first.",
    h1: "Clean your purchase data before your Oracle EBS migration",
    trigger:
      "Oracle has repeatedly extended Premier Support for E-Business Suite 12.2, most recently through at least 2037, so there's no near-term forced deadline. The trigger for most EBS customers is a business decision to modernise, not an end-of-support date.",
    triggerDateSource:
      "https://www.oracle.com/a/ocom/docs/applications/ebusiness/ebs-122-premier-support-extended-through-at-least-2037.pdf",
    pains: [
      "Purchasing categories and supplier records have been customised over many years, so the category structure reflects history more than current spend.",
      "Supplier sites and duplicates across operating units make it hard to see one supplier as a single relationship.",
      "Fusion's import formats are fixed, and they reject messy records rather than tolerating them the way older customisations did.",
    ],
    dataFocus: [
      "Purchasing categories, which usually need consolidating onto one standard before they'll report cleanly in Fusion.",
      "Suppliers and supplier sites, where duplication across operating units is common.",
      "Fusion's import formats, which are stricter than EBS about what a valid record looks like.",
    ],
    goodData: ["Purchasing categories mapped to one standard.", "One supplier record with clean sites underneath it."],
    faqs: [
      {
        q: "What data should we clean before moving from Oracle EBS to Fusion?",
        a: "Purchasing categories and supplier records first, since Fusion's import formats reject records that don't fit its structure, and messy categories or duplicate suppliers are the most common cause of failed loads.",
      },
      {
        q: "How long does it take to prepare EBS supplier data for Fusion?",
        a: "It depends on how many operating units and how many years of accumulated duplicates there are, but starting the assessment early, alongside the rest of the migration, avoids finding the problem during a failed test load.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/jd-edwards-to-fusion",
      "/spend-cube",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "jd-edwards-to-fusion",
    vendorGroup: "Oracle",
    system: "Oracle Fusion",
    standard: "UNSPSC",
    title: "Clean your data before moving JD Edwards to Fusion",
    metaDescription: "Moving JD Edwards to Oracle Fusion? Clean the address book and category codes before you migrate.",
    h1: "Clean your purchase data before your JD Edwards migration",
    trigger:
      "Oracle's support policy for JD Edwards EnterpriseOne 9.2 has also been extended, following the same pattern as E-Business Suite, so most JD Edwards customers are moving on their own timeline rather than against a forced deadline.",
    triggerDateSource: "https://docs.oracle.com/cd/E84502_01/learnjde/jde-premier-support.html",
    pains: [
      "Category codes have been repurposed for many different things over the years, so the same code field means something different in different modules.",
      "One address book holds suppliers, customers and employees together, which makes it hard to isolate supplier data cleanly.",
      "Item descriptions are written differently at each branch, since JD Edwards never enforced a shared format across sites.",
    ],
    dataFocus: [
      "Address book records for suppliers, which need separating cleanly from customers and employees before they migrate.",
      "Category codes, which usually need replacing with one classification standard rather than carried forward as repurposed fields.",
      "The item master, where descriptions typically vary the most between branches.",
    ],
    goodData: [
      "Suppliers separated cleanly from other address book records.",
      "Category codes replaced by one standard.",
    ],
    faqs: [
      {
        q: "How do we clean the JD Edwards address book before migrating?",
        a: "Separate supplier records from customer and employee records first, then de-duplicate suppliers across branches, since JD Edwards' single address book design makes it easy for these to get mixed together.",
      },
      {
        q: "What happens to JD Edwards category codes in Oracle Fusion?",
        a: "Category codes don't map one-to-one to Fusion's structure, particularly where they've been repurposed over the years, so it's usually better to replace them with one classification standard rather than force a direct mapping.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/oracle-ebs-to-fusion",
      "/spend-cube",
    ],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Infor
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "infor-m3-ln-to-cloudsuite",
    vendorGroup: "Infor",
    system: "Infor CloudSuite",
    standard: "UNSPSC",
    title: "Clean your data before moving Infor M3 or LN to the cloud",
    metaDescription: "Moving Infor M3 or LN on-premise to CloudSuite? Clean item and supplier data before you migrate.",
    h1: "Clean your purchase data before your Infor CloudSuite migration",
    trigger:
      "Infor's on-premise M3 and LN customers don't all face the same deadline, but multi-tenant CloudSuite limits the customisation many on-premise deployments have relied on for years, which is usually what starts the conversation.",
    pains: [
      "Item and supplier data has been customised for the on-premise environment over many years, in ways that don't carry across cleanly.",
      "Multi-tenant cloud limits how much customisation is possible, so data has to fit standard structures rather than the bespoke ones it grew into.",
      "Items are described differently across sites, since on-premise deployments rarely enforced one format.",
    ],
    dataFocus: [
      "The item master, which usually needs standardising before it fits CloudSuite's structures.",
      "Suppliers, where duplication across sites is common.",
      "Fitting data to standard cloud structures, rather than assuming the old customisations will carry across.",
    ],
    goodData: ["Item data fitted to standard fields.", "Suppliers de-duplicated."],
    faqs: [
      {
        q: "What data should we clean before moving to Infor CloudSuite?",
        a: "Item and supplier records, since CloudSuite's multi-tenant model has less room for the customisation that on-premise M3 or LN deployments typically accumulate, so data needs to fit standard structures before it moves.",
      },
    ],
    relatedSlugs: ["/unspsc", "/procurement-data-quality", "/data-quality", "/asset-data-management", "/spend-cube"],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Sage
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "sage-200-x3-to-intacct",
    vendorGroup: "Sage",
    system: "Sage Intacct",
    standard: "UNSPSC",
    title: "Clean your data before moving Sage 200 or X3 to Intacct",
    metaDescription: "Moving Sage 200 or X3 to Sage Intacct? Map nominal and analysis codes to dimensions first.",
    h1: "Clean your purchase data before your Sage Intacct migration",
    trigger:
      "Sage's support windows for both Sage 200 and Sage X3 are version-based rather than a single fixed date, so the trigger for most companies is choosing to consolidate reporting on Intacct rather than a forced deadline.",
    pains: [
      "Nominal codes and stock items were set up differently per company, so the same spend sits under different codes depending on which entity entered it.",
      "Analysis codes are used inconsistently, so what one team calls a category, another team calls something else.",
      "History is often left behind in the move, because nobody decided in advance what needed to stay reportable.",
    ],
    dataFocus: [
      "Suppliers and stock items, which diverge most between companies that grew up on separate Sage 200 or X3 instances.",
      "Nominal and analysis codes, which need mapping to Intacct's dimensions rather than carried forward as-is.",
    ],
    goodData: [
      "Codes mapped consistently to dimensions.",
      "Suppliers de-duplicated across companies.",
    ],
    faqs: [
      {
        q: "How do we map Sage nominal codes to Sage Intacct dimensions?",
        a: "Start by listing every nominal and analysis code in use across every company, group the ones that mean the same thing despite being labelled differently, then map each group to one Intacct dimension.",
      },
      {
        q: "What should we clean before moving to Sage Intacct?",
        a: "Supplier and stock item records across every company first, since these are what determine whether spend reporting in Intacct is comparable across the group from day one.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/spend-cube",
      "/migrations/sage-300-cre-to-intacct-construction",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "sage-300-cre-to-intacct-construction",
    vendorGroup: "Sage",
    system: "Sage Intacct Construction",
    standard: "UNSPSC",
    title: "Clean your data before moving Sage 300 CRE to Intacct",
    metaDescription: "Moving Sage 300 CRE to Sage Intacct Construction? Standardise job cost codes and vendors first.",
    h1: "Clean your job cost data before your Sage 300 CRE migration",
    trigger:
      "Sage hasn't announced an end-of-life for Sage 300 Construction and Real Estate, so the trigger for most contractors is choosing to move to Intacct Construction for its reporting, not a forced deadline.",
    pains: [
      "Job cost codes and cost types were set up differently per job or per office, so the same cost sits under different codes on different jobs.",
      "Subcontract and committed cost records are inconsistent, which makes it hard to see committed spend accurately across jobs.",
      "Historical job costs are hard to compare, because the code structure changed too often to give a like-for-like view.",
    ],
    dataFocus: [
      "Job cost codes and cost types, which usually need consolidating onto one structure before they're useful across jobs.",
      "Subcontracts and committed costs, which need checking for consistency before they move.",
      "Vendors, where duplication across jobs and offices is common.",
    ],
    goodData: [
      "One cost code structure across jobs.",
      "Historical job costs classified for estimating.",
    ],
    faqs: [
      {
        q: "How do we standardise job cost codes before moving to Sage Intacct Construction?",
        a: "List every cost code and cost type in use across jobs and offices, group the ones that describe the same cost despite different labels, and agree one structure before anything migrates.",
      },
      {
        q: "Can we keep historical job cost data comparable after migrating?",
        a: "Only if it's classified against the new, consolidated cost code structure before the move. Migrating it as-is carries forward the same inconsistencies that made it hard to compare in the first place.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/sage-200-x3-to-intacct",
      "/migrations/4ps-to-4ps-construct",
    ],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Construction ERP
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "4ps-to-4ps-construct",
    vendorGroup: "Construction ERP",
    system: "4PS Construct",
    standard: "UNSPSC",
    title: "Clean your data before moving to 4PS Construct",
    metaDescription: "Moving to 4PS Construct, built on Microsoft Dynamics 365 Business Central? Clean project data first.",
    h1: "Clean your purchase data before your 4PS Construct migration",
    trigger:
      "4PS Construct is built on Microsoft Dynamics 365 Business Central, and moving onto it means your project and purchase data has to fit Business Central's data model, not just 4PS's older structures.",
    pains: [
      "Project and purchase data has been built up per project and per office, so the same supplier or material can look different depending on which project entered it.",
      "Materials and subcontractors are described inconsistently, which makes it hard to compare costs across projects.",
      "Comparing costs across projects is hard when the underlying categories were never standardised in the first place.",
    ],
    dataFocus: [
      "Project costs, which need a consistent structure to be comparable once they're in Business Central.",
      "Suppliers and subcontractors, where duplication across projects and offices is common.",
      "Materials, which are usually described differently from project to project.",
    ],
    goodData: [
      "Suppliers de-duplicated across projects.",
      "Purchase lines classified per project, on one shared standard.",
    ],
    faqs: [
      {
        q: "What should construction companies clean before moving to 4PS Construct?",
        a: "Supplier, subcontractor and material records across every project first, since 4PS Construct runs on Business Central's data model, and inconsistent project-level data won't automatically become comparable just by moving into a new system.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/sage-300-cre-to-intacct-construction",
      "/migrations/viewpoint-vista-to-trimble-construction-one",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "viewpoint-vista-to-trimble-construction-one",
    vendorGroup: "Construction ERP",
    system: "Trimble's connected construction platform",
    standard: "UNSPSC",
    title: "Clean your data before connecting Vista to Trimble's platform",
    metaDescription: "Bringing Viewpoint Vista into Trimble's connected construction platform? Clean job cost data first.",
    h1: "Clean your job cost data before connecting Vista to Trimble's platform",
    trigger:
      "Trimble is bringing Viewpoint Vista into a connected construction platform alongside its other tools, and many contractors are being asked to standardise their financial data as part of that, rather than working to a fixed retirement date for Vista itself.",
    pains: [
      "Phase codes and cost types have grown differently per job, so the same type of cost can sit under different codes depending on when and where the job was set up.",
      "Vendor and subcontractor records are duplicated, often under near-identical names entered by different project teams.",
      "Historical job costs are hard to reuse for estimating when the underlying codes were never consistent.",
    ],
    dataFocus: [
      "Phase codes and cost types, which usually need consolidating onto one structure to be useful across jobs.",
      "Vendors and subcontractors, where duplicate records are common across projects.",
      "Job cost history, which needs classifying consistently if it's going to feed future estimates.",
    ],
    goodData: [
      "One phase code structure across jobs.",
      "Vendors de-duplicated.",
    ],
    faqs: [
      {
        q: "How do we clean Vista job cost data before moving to Trimble's connected platform?",
        a: "Consolidate phase codes and cost types onto one structure across every job, then de-duplicate vendor and subcontractor records, so cost data is comparable across jobs once it's connected to Trimble's other tools.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/4ps-to-4ps-construct",
      "/migrations/sage-300-cre-to-intacct-construction",
    ],
    status: "published",
  },
  {
    kind: "migration",
    slug: "coins-migration",
    vendorGroup: "Construction ERP",
    system: "Access Coins",
    standard: "UNSPSC",
    title: "Clean your data before your COINS migration",
    metaDescription: "Moving off an older COINS construction ERP? Clean supplier and cost code data before you migrate.",
    h1: "Clean your purchase data before your COINS migration",
    trigger:
      "COINS is now part of The Access Group, sold as Access Coins, and construction companies on older COINS deployments are increasingly being moved onto the current platform.",
    pains: [
      "Supplier records built up over years of manual entry, often duplicated under slightly different names.",
      "Cost codes set up differently across jobs, making spend hard to compare.",
    ],
    dataFocus: [
      "Supplier records, where duplication is the most common problem in older COINS deployments.",
      "Cost codes, which typically need consolidating before they're comparable across jobs.",
    ],
    goodData: ["Suppliers de-duplicated before the move."],
    faqs: [
      {
        q: "What should we clean before migrating from COINS?",
        a: "Supplier records and cost codes first. These are the fields most likely to have drifted across jobs and years, and the ones a new platform will expect in a consistent format.",
      },
    ],
    relatedSlugs: [
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
      "/migrations/4ps-to-4ps-construct",
      "/migrations/viewpoint-vista-to-trimble-construction-one",
    ],
    status: "draft",
  },

  // ---------------------------------------------------------------------
  // IFS
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "ifs-10-to-ifs-cloud",
    vendorGroup: "IFS",
    system: "IFS Cloud",
    standard: "UNSPSC",
    title: "Clean your data before upgrading IFS Applications 10",
    metaDescription: "IFS Applications 10 extended support ends March 2028. Clean part and supplier data before IFS Cloud.",
    h1: "Clean your purchase data before your IFS Cloud upgrade",
    trigger:
      "Standard support for IFS Applications 10 ended on 27 March 2025, and extended support runs to 27 March 2028, after which IFS moves customers onto the regular IFS Cloud update cycle.",
    triggerDateSource: "https://community.ifs.com/support-services-faqs-and-help-384/my-customer-is-using-ifs-app-10-which-support-will-end-27-mar-2025-44695",
    pains: [
      "Part and supplier records have been customised in Apps 10 over the years, often in ways specific to one site.",
      "Purchase parts are described inconsistently, so the same part can appear under several different descriptions.",
      "Moving to IFS Cloud's regular update cycle leaves less room for the workarounds that used to paper over inconsistent data.",
    ],
    dataFocus: [
      "Purchase parts, where description inconsistency is the most common issue carried forward from Apps 10.",
      "Suppliers, where duplication across sites is common.",
      "The part catalogue, which needs standardising before it fits IFS Cloud's update cycle without repeated manual fixes.",
    ],
    goodData: ["Part descriptions standardised.", "Suppliers de-duplicated."],
    faqs: [
      {
        q: "What data should we clean before upgrading from IFS Applications 10 to IFS Cloud?",
        a: "Part and supplier records first. IFS Cloud's regular update cycle has less tolerance for the site-specific workarounds that often build up around inconsistent part descriptions and duplicate suppliers in Apps 10.",
      },
    ],
    relatedSlugs: ["/unspsc", "/procurement-data-quality", "/data-quality", "/asset-data-management", "/spend-cube"],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // IBM Maximo
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "maximo-76-to-mas",
    vendorGroup: "IBM Maximo",
    system: "Maximo Application Suite",
    standard: "UNSPSC",
    title: "Clean your asset data before moving Maximo 7.6 to MAS",
    metaDescription: "IBM Maximo 7.6.1 support ended September 2025. Clean asset and item data before Maximo Application Suite.",
    h1: "Clean your asset data before your Maximo Application Suite migration",
    trigger:
      "IBM's support for Maximo 7.6.1 ended on 30 September 2025, so companies still running it are past the point of receiving fixes and are migrating to Maximo Application Suite (MAS).",
    triggerDateSource: "https://www.ibm.com/support/pages/end-support-announcement-eos-maximo-761",
    pains: [
      "Asset and location hierarchies are inconsistent between sites, so the same type of asset can sit in a different place in the hierarchy depending on the site.",
      "The item master is full of duplicate parts, often the same part under several supplier-specific descriptions.",
      "Manufacturer data is missing or wrong on a large share of records, which undermines both maintenance planning and spend reporting.",
    ],
    dataFocus: [
      "Assets and locations, where hierarchy inconsistency between sites is the most common structural problem.",
      "The item master, where duplicate parts inflate both stock counts and reporting noise.",
      "Manufacturers and suppliers, which are frequently missing, misspelled or inconsistent.",
      "Classifications, which need mapping to one standard before they're useful across the whole portfolio.",
    ],
    goodData: [
      "One asset hierarchy across sites.",
      "Duplicate items merged.",
      "Manufacturer data checked against a trusted list.",
    ],
    faqs: [
      {
        q: "What asset data should we clean before moving to Maximo Application Suite?",
        a: "Asset and location hierarchies, the item master, and manufacturer data. These are the fields that most commonly drift between sites over the life of a Maximo deployment, and the ones that determine whether reporting in MAS is trustworthy from day one.",
      },
      {
        q: "How do we remove duplicate items from the Maximo item master?",
        a: "Match items and their descriptions against each other and against a trusted manufacturer list, so duplicate parts entered under different spellings or supplier-specific descriptions are merged into one canonical record before they migrate.",
      },
    ],
    proof: {
      stat: "9,175 → 1,493",
      label: "supplier name variants consolidated across 204,029 asset records for a hard services client",
    },
    relatedSlugs: [
      "/asset-data-management",
      "/industries#hard-services",
      "/unspsc",
      "/data-quality",
      "/procurement-data-quality",
    ],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Exact
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "exact-globe-to-exact-online",
    vendorGroup: "Exact",
    system: "Exact Online",
    standard: "UNSPSC",
    title: "Clean your data before moving Exact Globe to Exact Online",
    metaDescription: "Exact Globe Next reached end of life in March 2026. Clean article and relation data before Exact Online.",
    h1: "Clean your purchase data before your Exact Globe migration",
    trigger:
      "Exact Globe Next reached end of life in March 2026, though Exact's support department continues supporting it until the end of 2027 for most modules.",
    triggerDateSource: "https://scansys.eu/blog/exact-globe-next-end-of-life-in-2026",
    pains: [
      "Articles (items) and relations (suppliers and customers) were set up without shared standards over many years.",
      "History is often not moved across, because nobody decided in advance what needed to stay reportable.",
      "Administrations were set up differently from each other, so the same article or relation can look different depending on which administration entered it.",
    ],
    dataFocus: [
      "Articles, which usually need standardising across administrations before they migrate.",
      "Relations, where duplication across administrations is common.",
      "Which history to keep, since the standard move doesn't automatically carry everything across.",
    ],
    goodData: [
      "Relations de-duplicated across administrations.",
      "Articles classified to one standard.",
    ],
    faqs: [
      {
        q: "What should we clean before moving from Exact Globe to Exact Online?",
        a: "Article and relation records across every administration. These typically diverge the most over the life of an Exact Globe deployment, and they determine whether reporting in Exact Online is comparable across administrations from day one.",
      },
    ],
    relatedSlugs: ["/unspsc", "/procurement-data-quality", "/data-quality", "/spend-cube", "/fabric"],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // Unit4
  // ---------------------------------------------------------------------
  {
    kind: "migration",
    slug: "unit4-to-erpx",
    vendorGroup: "Unit4",
    system: "Unit4 ERPx",
    standard: "UNSPSC",
    title: "Clean your data before moving Unit4 to ERPx",
    metaDescription: "Unit4 on-premise support ended December 2024. Clean supplier and category data before ERPx.",
    h1: "Clean your purchase data before your Unit4 ERPx migration",
    trigger: "Unit4 ended support for its on-premise ERP on 31 December 2024, and is moving customers to its cloud product, Unit4 ERPx.",
    triggerDateSource: "https://www.theregister.com/2023/10/31/unit4_onprem_support_2025/",
    pains: [
      "Suppliers and purchase categories were customised on-premise over many years, in ways specific to that deployment.",
      "Spend is hard to report across the organisation, because categories were never standardised in the first place.",
    ],
    dataFocus: [
      "Suppliers, where duplication built up over years of on-premise customisation.",
      "Purchase categories, which need mapping to one standard before spend is comparable across the organisation.",
    ],
    goodData: [
      "Suppliers de-duplicated.",
      "Categories mapped to one standard.",
    ],
    faqs: [
      {
        q: "What data should we clean before moving to Unit4 ERPx?",
        a: "Supplier and purchase category records first, since these are what determine whether spend reporting is comparable across the organisation once you're on ERPx, and they're the fields most likely to carry years of on-premise customisation.",
      },
    ],
    relatedSlugs: ["/unspsc", "/procurement-data-quality", "/data-quality", "/spend-cube", "/fabric"],
    status: "published",
  },

  // ---------------------------------------------------------------------
  // ECLASS
  // ---------------------------------------------------------------------
  {
    kind: "eclass",
    slug: "eclass-classification",
    vendorGroup: "ECLASS",
    system: "ECLASS",
    standard: "ECLASS",
    title: "ECLASS classification for product and purchase data",
    metaDescription: "What ECLASS (formerly eCl@ss) is, who requires it, and how Pearstop classifies data to it.",
    h1: "ECLASS classification for your product and purchase data",
    intro:
      "ECLASS (formerly written eCl@ss) is a classification standard for the technical attributes of a specific item at the material master level: its properties, its specifications, the details an engineer needs to specify or match a part correctly. It's the standard most often requested across manufacturing and industrial companies, and it's especially strong in Germany and the wider DACH region, where a parent company, client or engineering team may require ECLASS-level detail on material records that were never classified that way to begin with.",
    howClassificationSteps: [
      {
        title: "Assess what you have",
        body: "Pearstop reviews your product and purchase data to see what's classified, what's missing, and how consistent the existing descriptions are.",
      },
      {
        title: "Classify with AI and a person reviewing uncertain lines",
        body: "AI classification handles the clear cases, and a person reviews anything uncertain, so the ECLASS labels you get back are ones you can trust.",
      },
      {
        title: "Hand back classified data",
        body: "You get your data back with ECLASS codes mapped to your system's fields, ready to load or report against.",
      },
    ],
    dataFocus: [
      "Material master records, where ECLASS attributes are usually requested at the individual part level, not the category level.",
      "Product descriptions, which need enough consistency for classification to be reliable.",
      "Whether ECLASS needs to sit alongside an existing category standard such as UNSPSC, rather than replace it.",
    ],
    goodData: [
      "Material descriptions consistent enough to classify reliably.",
      "ECLASS attributes recorded at the material level, not guessed at category level.",
    ],
    faqs: [
      {
        q: "What is ECLASS classification?",
        a: "ECLASS (formerly written eCl@ss) classifies the technical attributes of a specific item at the material master level, giving the properties and specifications an engineer or procurement system needs to identify or match a part precisely.",
      },
      {
        q: "What is the difference between ECLASS and UNSPSC?",
        a: "UNSPSC classifies what category a purchase belongs to, for spend analysis and category management. ECLASS classifies the technical attributes of a specific item at the material level. They answer different questions rather than competing to answer the same one.",
      },
      {
        q: "Can AI classify products to ECLASS?",
        a: "Yes, with a person reviewing uncertain lines. AI handles the clear cases reliably, and routing anything uncertain to a person keeps the output accurate enough to use for engineering and procurement decisions.",
      },
    ],
    relatedSlugs: [
      "/eclass/eclass-to-unspsc-mapping",
      "/eclass/eclass-sap-s4hana",
      "/unspsc",
      "/procurement-data-quality",
      "/data-quality",
    ],
    status: "published",
  },
  {
    kind: "eclass",
    slug: "eclass-to-unspsc-mapping",
    vendorGroup: "ECLASS",
    system: "ECLASS and UNSPSC",
    standard: "ECLASS",
    title: "Mapping ECLASS to UNSPSC across a group",
    metaDescription: "One entity runs ECLASS, another reports in UNSPSC. Pearstop maps between the two so spend still adds up.",
    h1: "Map ECLASS to UNSPSC when your entities report differently",
    intro:
      "Some groups run into a specific problem: one entity classifies its material data to ECLASS (formerly written eCl@ss), because that's what its manufacturing or engineering stakeholders require, while another entity or the head office reports spend in UNSPSC. Neither entity is wrong. The two standards answer different questions, one about technical attributes, one about spend category, and most groups in this position don't choose one over the other. They map between them so both views stay accurate.",
    howClassificationSteps: [
      {
        title: "Classify each entity to its own standard",
        body: "Pearstop classifies each entity's data to whichever standard it already reports against, ECLASS or UNSPSC, rather than forcing a single standard across the group.",
      },
      {
        title: "Map between the two",
        body: "Where the group needs a combined view, we map ECLASS categories to their nearest UNSPSC equivalent, and flag where the mapping is approximate rather than exact.",
      },
      {
        title: "Keep both views current",
        body: "As new purchase and material data comes in, it's classified and mapped the same way, so the combined view doesn't drift out of date.",
      },
    ],
    dataFocus: [
      "Which entities report in which standard today, before anything is remapped.",
      "Where ECLASS technical attributes and UNSPSC spend categories genuinely correspond, and where the mapping can only be approximate.",
      "How new data keeps getting classified and mapped consistently after the initial project.",
    ],
    goodData: [
      "Every entity's classification standard documented, not assumed.",
      "A maintained mapping table between ECLASS and UNSPSC categories, not a one-off spreadsheet.",
    ],
    faqs: [
      {
        q: "Can you map ECLASS codes to UNSPSC?",
        a: "Yes. Pearstop maps ECLASS categories to their nearest UNSPSC equivalent, and flags where a mapping is approximate because the two standards were built to answer different questions.",
      },
      {
        q: "How do we report spend when entities use different standards?",
        a: "Keep each entity classifying against the standard it already uses, and map between ECLASS and UNSPSC for the combined view, rather than forcing every entity onto one standard it wasn't built to serve.",
      },
    ],
    relatedSlugs: [
      "/eclass/eclass-classification",
      "/eclass/eclass-sap-s4hana",
      "/unspsc",
      "/procurement-data-quality",
      "/spend-cube",
    ],
    status: "published",
  },
  {
    kind: "eclass",
    slug: "eclass-sap-s4hana",
    vendorGroup: "ECLASS",
    system: "S/4HANA",
    standard: "ECLASS",
    title: "ECLASS classification for your S/4HANA material master",
    metaDescription: "Classifying your material master to ECLASS during an S/4HANA migration? Pearstop handles it end to end.",
    h1: "Classify your material master to ECLASS during your S/4HANA migration",
    intro:
      "Manufacturing and industrial companies moving to S/4HANA are sometimes asked, by a parent company, client or engineering stakeholder, to classify their material master to ECLASS (formerly written eCl@ss) rather than, or alongside, a spend category standard. Doing this during the migration itself, rather than after go-live, means the classified data is ready for the same test runs the rest of your migration goes through.",
    howClassificationSteps: [
      {
        title: "Assess the material master",
        body: "Pearstop checks your material master data alongside the rest of your migration assessment, so ECLASS classification isn't a separate, later project.",
      },
      {
        title: "Classify with AI and a person reviewing uncertain lines",
        body: "AI classification handles the clear cases, and a person reviews anything uncertain, so the ECLASS labels going into S/4HANA are ones you can trust.",
      },
      {
        title: "Map to S/4HANA's fields",
        body: "Classified data is mapped to the material master fields S/4HANA expects, in the format your implementation partner's import tools need.",
      },
    ],
    dataFocus: [
      "The material master, which is where ECLASS attributes are recorded, alongside the rest of the S/4HANA data cleanup.",
      "Whether ECLASS needs to sit alongside a spend category standard such as UNSPSC, since most manufacturing groups need both.",
      "Timing: classifying the material master during the assessment phase, not after the first failed test run.",
    ],
    goodData: [
      "Material master records carrying ECLASS attributes wherever a stakeholder requires them.",
      "ECLASS and any spend category standard both mapped to S/4HANA's fields, documented, not left as a manual side project.",
    ],
    faqs: [
      {
        q: "Can we classify our material master to ECLASS during an S/4HANA migration?",
        a: "Yes. It fits naturally alongside the rest of the material master cleanup an S/4HANA migration already requires, and doing it during the assessment phase means the classified data is ready for the same test runs as everything else.",
      },
    ],
    relatedSlugs: [
      "/eclass/eclass-classification",
      "/eclass/eclass-to-unspsc-mapping",
      "/migrations/sap-ecc-to-s4hana",
      "/unspsc",
      "/data-quality",
    ],
    status: "published",
  },
];

export function getMigrationEntry(slug: string): MigrationEntry | undefined {
  return migrationEntries.find((entry) => entry.slug === slug);
}

export function publishedMigrationSlugs(): string[] {
  return migrationEntries.filter((entry) => entry.status === "published").map((entry) => entry.slug);
}

export function basePathFor(entry: MigrationEntry): "/migrations" | "/eclass" {
  return entry.kind === "eclass" ? "/eclass" : "/migrations";
}
