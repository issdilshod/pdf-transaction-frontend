import NumberFunction from "../../transaction/functions/NumberFunction";
import TypeFunction from "./TypeFunction";

class PdfContent {

    constructor(){
        this.offset = {
            'daily_balances': {
                '3': 1179,
                '4': 1119,
                '5': 1076,
                '6': 1033,
                '7': 973,
                'negative': {
                    'x': 27
                }
            },

            'account_summary': {
                '3': 2299,
                '4': 2239,
                '5': 2196,
                '6': 2153,
                '7': 2093,

                'negative': {
                    'x': 29
                },

                'ending_balance': {
                    '3': 2258,
                    '4': 2187,
                    '5': 2138,
                    '6': 2089,
                    '7': 2018,
                }
            },
        };

        this.AccountSummary = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 0 k\n0 0 0 0 K\nq\n0 0 0 0 k\n3150 -709 m\n3300 -709 l\n3300 -949 l\n3150 -949 l\nh\nf*\n0 0 0 0 k\n0 0 0 0 K\nQ\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F1 79.167 Tf\n3330 -813 Td\n(Customer service information)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 3180 -1022 cm\n2 0 0 2 0 0 cm\n0 0 m\n37 0 l\n37 -43 l\n0 -43 l\n0 0 l\nh\nW\nn\nq\nq\n37 0 0 43 0 -43 cm\n/Im1 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n3330 -1095 Td\n(1.888.BUSINESS (1.888.287.4637))Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 3180 -1213 cm\n2 0 0 2 0 0 cm\n0 0 m\n48 0 l\n48 -37 l\n0 -37 l\n0 0 l\nh\nW\nn\nq\nq\n48 0 0 37 0 -37 cm\n/Im2 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n3330 -1281 Td\n(bankofamerica.com)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 3180 -1363 cm\n2 0 0 2 0 0 cm\n0 0 m\n49 0 l\n49 -34 l\n0 -34 l\n0 0 l\nh\nW\nn\nq\nq\n49 0 0 34 0 -34 cm\n/Im3 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n3330 -1425 Td\n({organization_name})Tj\n0 -84 Td\n(P.O. Box 25118)Tj\n0 -84 Td\n(Tampa, FL 33622-5118)Tj\n0 0 0 1 k\n/F2 75 Tf\n-2955 214 Td\n({company_name})Tj\n0 -90 Td\n({company_address})Tj\n0 -90 Td\n({company_address2})Tj\n0 0 0 rg\n0 0 0 .8 k\n/F3 58.333 Tf\n-45 787 Td\n(P.O. Box 15284)Tj\n0 -74 Td\n(Wilmington, DE 19850)Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n.98437 w\n300 -6450 m\n4800 -6450 l\nS\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F4 50 Tf\n300 -6506 Td\n( )Tj\n0 0 0 rg\n0 0 0 1 k\n(PULL: E   CYCLE: 67   SPEC: E   DELIVERY: E   TYPE:    IMAGE: I   BC: CA2)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 300 -432 cm\n2 0 0 2 0 0 cm\n0 0 m\n708 0 l\n708 -105 l\n0 -105 l\n0 0 l\nh\nW\nn\nq\nq\n708 0 0 105 0 -105 cm\n/Im4 Do\nQ\nQ\nQ\nQ\nQ\nq\nq\nq\n1 0 0 1 3150 -458 cm\nq\nq\n1140 0 0 210 0 -210 cm\n/Im5 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F4 79.167 Tf\n4200 -6522 Td\n(Page 1 of {max_page})Tj\n0 0 0 rg\n0 0 0 1 k\n/F1 141.67 Tf\n-3900 3852 Td\n(Your Business Advantage Fundamentals™ Banking )Tj\n/F2 91.667 Tf\n0 -144 Td\n(for {start_period} to {end_period})Tj\n2850 0 Td\n(Account number: {account_number})Tj\n/F1 83.333 Tf\n-2850 -153 Td\n({company_name})Tj\n0 1 .74902 .039216 k\n/F5 125 Tf\n0 -217 Td\n(Account summary)Tj\n0 0 0 1 k\n/F2 79.167 Tf\n0 -140 Td\n(Beginning balance on {start_period})Tj\n{begining_balance_x} 0 Td\n(${begining_balance})Tj\n-{begining_balance_x_minus} -154 Td\n(Deposits and other credits)Tj\n{deposits_x} 0 Td\n({deposits_sum})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -3374 m\n2873 -3374 l\nS\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F2 79.167 Tf\n300 -3632 Td\n(Withdrawals and other debits)Tj\n{withdrawals_x} 0 Td\n({withdrawals_sum})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -3528 m\n2873 -3528 l\nS\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F2 79.167 Tf\n300 -3786 Td\n(Checks)Tj\n2399 0 Td\n(-0.00)Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -3682 m\n2873 -3682 l\nS\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F2 79.167 Tf\n300 -3940 Td\n(Service fees)Tj\n2399 0 Td\n(-0.00)Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -3836 m\n2873 -3836 l\nS\nQ\nQ\nq\n1 .6 0 .05098 k\nBT\n/F1 83.333 Tf\n300 -4101 Td\n(Ending balance on {end_period})Tj\n{ending_balance_x} 0 Td\n(${ending_balance})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -3990 m\n2873 -3990 l\nS\nQ\nQ\nq\n0 0 0 1 k\nBT\n/F2 75 Tf\n3030 -3358 Td\n(# of deposits/credits: {number_deposits})Tj\n0 -150 Td\n(# of withdrawals/debits: {number_withdrawals})Tj\n0 -150 Td\n(# of items-previous cycle¹: {item_previous_cycle})Tj\n0 -150 Td\n(# of days in cycle: {days_in_cycle})Tj\n0 -150 Td\n(Average ledger balance: ${average_balance})Tj\n/F6 66.667 Tf\n0 -140 Td\n(¹Includes checks paid,deposited items&other debits)Tj\nET\nQ\nq\nq\nq\n1 0 0 1 450 -5175 cm\n2 0 0 2 0 0 cm\n0 0 m\n2100 0 l\n2100 -555 l\n0 -555 l\n0 0 l\nh\nW\nn\nq\nq\n2100 0 0 555 0 -555 cm\n/Im6 Do\nQ\nQ\nQ\nQ\nQ\nQ";
        this.ImportantInformation = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 1 k\nBT\n/F2 66.667 Tf\n300 -272 Td\n({company_name}   !   Account # {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -306 m\n4626 -306 l\nS\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n4200 -6524 Td\n(Page 2 of {max_page})Tj\n0 1 .74902 .039216 k\n/F3 133.33 Tf\n-3900 6035 Td\n(IMPORTANT INFORMATION:)Tj\n/F2 125 Tf\n0 -153 Td\n(BANK DEPOSIT ACCOUNTS)Tj\n/F2 83.333 Tf\n0 -213 Td\n(How to Contact Us )Tj\n0 0 0 1 k\n691 0 Td\n(-)Tj\n0 1 .74902 .039216 k\n30 0 Td\n( )Tj\n0 0 0 1 k\n23 0 Td\n(You may call us at the telephone number listed on the front of this statement.)Tj\n0 1 .74902 .039216 k\n-744 -202 Td\n(Updating your contact information)Tj\n0 0 0 1 k\n1217 0 Td\n( - We encourage you to keep your contact information up-to-date. This includes address,)Tj\n-1217 -101 Td\n(email and phone number. If your information has changed, the easiest way to update it is by visiting the Help & Support tab of)Tj\n0 -101 Td\n(Online Banking.)Tj\n0 1 .74902 .039216 k\n0 -205 Td\n(Deposit agreement)Tj\n0 0 0 1 k\n672 0 Td\n( - When you opened your account, you received a deposit agreement and fee schedule and agreed that your)Tj\n-672 -101 Td\n(account would be governed by the terms of these documents, as we may amend them from time to time. These documents are)Tj\n0 -101 Td\n(part of the contract for your deposit account and govern all transactions relating to your account, including all deposits and)Tj\n0 -101 Td\n(withdrawals. Copies of both the deposit agreement and fee schedule which contain the current version of the terms and)Tj\n0 -101 Td\n(conditions of your account relationship may be obtained at our financial centers.)Tj\n0 1 .74902 .039216 k\n0 -205 Td\n(Electronic transfers: In case of errors or questions about your electronic transfers)Tj\n0 0 0 1 k\n2864 0 Td\n( - If you think your statement or receipt is)Tj\n-2864 -101 Td\n(wrong or you need more information about an electronic transfer (e.g., ATM transactions, direct deposits or withdrawals,)Tj\n0 -101 Td\n(point-of-sale transactions) on the statement or receipt, telephone or write us at the address and number listed on the front of)Tj\n0 -101 Td\n(this statement as soon as you can. We must hear from you no later than 60 days after we sent you the FIRST statement on)Tj\n0 -101 Td\n(which the error or problem appeared.)Tj\n150 -205 Td\n(—)Tj\n150 0 Td\n(Tell us your name and account number.)Tj\n-150 -101 Td\n(—)Tj\n150 0 Td\n(Describe the error or transfer you are unsure about, and explain as clearly as you can why you believe there is an error)Tj\n0 -101 Td\n(or why you need more information.)Tj\n-150 -101 Td\n(—)Tj\n150 0 Td\n(Tell us the dollar amount of the suspected error.)Tj\n-300 -205 Td\n(For consumer accounts used primarily for personal, family or household purposes, we will investigate your complaint and will)Tj\n0 -101 Td\n(correct any error promptly. If we take more than 10 business days (10 calendar days if you are a Massachusetts customer) (20)Tj\n0 -101 Td\n(business days if you are a new customer, for electronic transfers occurring during the first 30 days after the first deposit is)Tj\n0 -101 Td\n(made to your account) to do this, we will provisionally credit your account for the amount you think is in error, so that you will)Tj\n0 -101 Td\n(have use of the money during the time it will take to complete our investigation.)Tj\n0 -205 Td\n(For other accounts, we investigate, and if we find we have made an error, we credit your account at the conclusion of our)Tj\n0 -101 Td\n(investigation.)Tj\n0 1 .74902 .039216 k\n0 -205 Td\n(Reporting other problems)Tj\n0 0 0 1 k\n899 0 Td\n( - You must examine your statement carefully and promptly. You are in the best position to discover)Tj\n-899 -101 Td\n(errors and unauthorized transactions on your account. If you fail to notify us in writing of suspected problems or an)Tj\n0 -101 Td\n(unauthorized transaction within the time period specified in the deposit agreement (which periods are no more than 60 days)Tj\n0 -101 Td\n(after we make the statement available to you and in some cases are 30 days or less), we are not liable to you and you agree to)Tj\n0 -101 Td\n(not make a claim against us, for the problems or unauthorized transactions.)Tj\n0 1 .74902 .039216 k\n0 -205 Td\n(Direct deposits)Tj\n0 0 0 1 k\n532 0 Td\n( - If you have arranged to have direct deposits made to your account at least once every 60 days from the same)Tj\n-532 -101 Td\n(person or company, you may call us to find out if the deposit was made as scheduled. You may also review your activity online)Tj\n0 -101 Td\n(or visit a financial center for information.)Tj\n0 -303 Td\n( ©)Tj\n115 0 Td\n(2022)Tj\n184 0 Td\n( Bank of America Corporation)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 1200 -5460 cm\n2 0 0 2 0 0 cm\n0 0 m\n1212 0 l\n1212 -87 l\n0 -87 l\n0 0 l\nh\nW\nn\nq\nq\n1216 0 0 87 0 -87 cm\n/Im1 Do\nQ\nQ\nQ\nQ\nQ\nQ";
        
        // Transactions 
        this.Transactions = "{page_header}\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n4200 -6522 Td\n(Page {current_page} of {max_page})Tj\n0 0 0 rg\n0 1 .74902 .039216 k\n{type_first}{page_footer}";
        this.TransactionsNotMod2 = "{page_header}\n0 0 0 .90196 k\nBT\n/F3 79.167 Tf\n4200 -6522 Td\n(Page {current_page} of {max_page})Tj\n0 0 0 rg\n0 1 .74902 .039216 k\n{type_first}{page_footer}";
        this.TransactionsNotMod2Header = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 1 k\nBT\n/F4 66.667 Tf\n300 -692 Td\n({company_name}   !   Account #  {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -726 m\n4800 -726 l\nS\n0 0 0 0 k\n0 0 0 0 K\nq\n0 0 0 0 k\n3270 -300 m\n4630 -300 l\n4630 -486 l\n3270 -486 l\nh\nf*\n0 0 0 0 k\n0 0 0 0 K\nQ\nQ\nQ\nq\n0 1 .74902 .039216 k\nBT\n/F2 125 Tf\n3326 -451 Td\n(Your checking account)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 300 -390 cm\n2 0 0 2 0 0 cm\n0 0 m\n708 0 l\n708 -105 l\n0 -105 l\n0 0 l\nh\nW\nn\nq\nq\n708 0 0 105 0 -105 cm\n/Im1 Do\nQ\nQ\nQ\nQ\nQ\nq";
        this.TransactionsMod2Header = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 1 k\nBT\n/F3 66.667 Tf\n300 -302 Td\n({company_name}  !   Account #  {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -336 m\n4626 -336 l\nS\nQ\nQ\nq";
        this.TransactionsTypeFirstMod2 = "/F1 125 Tf\n-3900 {x_position} Td\n({type_title}{if_continued})Tj\n0 0 0 1 k\n/F3 66.667 Tf\n0 -96 Td\n(Date)Tj\n457 0 Td\n(Description)Tj\n3825 0 Td\n(Amount)Tj\n/F3 75 Tf\n{type_transactions}\n{type_summary}\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n{type_lines}";
        this.TransactionsTypeFirstNotMod2 = "/F1 125 Tf\n-3900 {x_position} Td\n({type_title}{if_continued})Tj\n0 0 0 1 k\n/F4 66.667 Tf\n0 -96 Td\n(Date)Tj\n457 0 Td\n(Description)Tj\n3825 0 Td\n(Amount)Tj\n/F4 75 Tf\n{type_transactions}\n{type_summary}\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n{type_lines}";
        this.TransactionsTypeSecond = "Q\nQ\nq\n0 1 .74902 .039216 k\nBT\n/F1 125 Tf\n300 {x_position} Td\n({type_title}{if_continued})Tj\n0 0 0 1 k\n/F3 66.667 Tf\n0 -96 Td\n(Date)Tj\n457 0 Td\n(Description)Tj\n3825 0 Td\n(Amount)Tj\n/F3 75 Tf\n{type_transactions}\n{type_summary}\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n{type_lines}";
        this.TransactionsSummaryContinue = "/F5 54.167 Tf\n{x_position} {y_position} Td\n(continued on the next page)Tj";
        this.TransactionsSummaryTotal = "1 .6 0 .05098 k\n/F4 83.333 Tf\n{x_pos_block} {y_pos_block} Td\n({total_title})Tj\n{x_position} 0 Td\n({total_sum})Tj";
        this.TransactionsSummaryTotalNotMod2 = "1 .6 0 .05098 k\n/F2 83.333 Tf\n{x_pos_block} {y_pos_block} Td\n({total_title})Tj\n{x_position} 0 Td\n({total_sum})Tj";
        this.TransactionsFooterPicture = "Q\nQ\nq\nq\nq\n1 0 0 1 450 -5175 cm\n2 0 0 2 0 0 cm\n0 0 m\n2100 0 l\n2100 -555 l\n0 -555 l\n0 0 l\nh\nW\nn\nq\nq\n2100 0 0 555 0 -555 cm\n/Im2 Do\nQ\nQ\nQ\nQ\nQ\nQ";
        this.TransactionsFooterNotPicture = "Q\nQ\nQ";

        this.ServiceFees = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 1 k\nBT\n/F1 66.667 Tf\n300 -302 Td\n({company_name}   !   Account # {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -336 m\n4626 -336 l\nS\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F3 79.167 Tf\n4200 -6522 Td\n(Page {current_page} of {max_page})Tj\n0 0 0 rg\n0 1 .74902 .039216 k\n/F2 125 Tf\n-3900 5886 Td\n(Service fees)Tj\n0 0 0 1 k\n/F1 75 Tf\n0 -106 Td\n(The Monthly Fee on your primary Business Advantage Fundamentals Banking account was waived for the statement period ending {last_day_of_last_month}.)Tj\n0 -90 Td\n(A check mark below indicates the requirement(s) you have met to qualify for the Monthly Fee waiver on the account.)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 330 -897 cm\n2 0 0 2 0 0 cm\nq\nq\n51 0 0 51 0 -51 cm\n/Im2 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .85098 k\nBT\n/F1 75 Tf\n523 -967 Td\n($250+ in new net purchases on a linked Business debit card has not been met)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 330 -1051 cm\n2 0 0 2 0 0 cm\n0 0 m\n44 0 l\n44 -42 l\n0 -42 l\n0 0 l\nh\nW\nn\nq\nq\n44 0 0 42 0 -42 cm\n/Im3 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .85098 k\nBT\n/F1 75 Tf\n522 -1121 Td\n($5,000+ combined average monthly balance in linked business accounts has been met)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 330 -1205 cm\n2 0 0 2 0 0 cm\nq\nq\n51 0 0 51 0 -51 cm\n/Im2 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .85098 k\nBT\n/F1 75 Tf\n523 -1275 Td\n(Become a member of Preferred Rewards for Business has not been met)Tj\n0 0 0 rg\nET\n0 0 0 .85098 k\nBT\n/F1 75 Tf\n300 -1429 Td\n(For information on how to open a new product, link an existing service to your account, or about Preferred Rewards for Business please)Tj\n0 -109 Td\n(call 1.888.BUSINESS or visit bankofamerica.com/smallbusiness.)Tj\n0 0 0 rg\nET\nQ\nQ";
        
        // Daily Balance
        this.DailyBalances = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 1 k\nBT\n/F4 66.667 Tf\n300 -692 Td\n({company_name}   !   Account #  {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -726 m\n4800 -726 l\nS\n0 0 0 0 k\n0 0 0 0 K\nq\n0 0 0 0 k\n3270 -300 m\n4630 -300 l\n4630 -486 l\n3270 -486 l\nh\nf*\n0 0 0 0 k\n0 0 0 0 K\nQ\nQ\nQ\nq\n0 1 .74902 .039216 k\nBT\n/F3 125 Tf\n3326 -451 Td\n(Your checking account)Tj\n0 0 0 rg\nET\nQ\nq\nq\nq\n1 0 0 1 300 -390 cm\n2 0 0 2 0 0 cm\n0 0 m\n708 0 l\n708 -105 l\n0 -105 l\n0 0 l\nh\nW\nn\nq\nq\n708 0 0 105 0 -105 cm\n/Im1 Do\nQ\nQ\nQ\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F2 79.167 Tf\n4200 -6522 Td\n(Page {current_page} of {max_page})Tj\n0 0 0 rg\n0 1 .74902 .039216 k\n/F1 125 Tf\n-3900 5466 Td\n(Daily ledger balances)Tj\n0 0 0 1 k\n/F4 66.667 Tf\n0 -98 Td\n(Date)Tj\n1099 0 Td\n(Balance ($))Tj\n446 2 Td\n(Date)Tj\n1117 0 Td\n(Balance($))Tj\n428 0 Td\n(Date)Tj\n1099 0 Td\n(Balance ($))Tj{daily_block}Q\nQ\nQ";
        this.DailyBalancesDailyBlock = "{if_not_first}\n/F4 79.167 Tf\n{date_x_pos} {date_y_pos} Td\n({date})Tj\n{amount_x_pos} 0 Td\n({amount})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n{lines1_x_pos} {lines1_y_pos} m\n{lines2_x_pos} {lines1_y_pos} l\nS\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n{lines1_x_pos} {lines2_y_pos} m\n{lines2_x_pos} {lines2_y_pos} l\nS\n";
        this.DailyBalancesDailyBlockIfNotFirst = "Q\nQ\nq\n0 0 0 1 k\nBT\n";

        this.BlankPage = "1 0 0 1 0 792 cm\nq\n.12 0 0 .12 0 0 cm\nq\n0 0 0 .50196 k\nBT\n/F2 100 Tf\n1860 -3392 Td\n(This page intentionally left blank)Tj\n0 0 0 1 k\n/F2 66.667 Tf\n-1560 3120 Td\n({company_name}   !   Account # {account_number}   !   {start_period} to {end_period})Tj\n0 0 0 rg\nET\nQ\nq\nq\n0 0 m\n5100 0 l\n5100 -6600 l\n0 -6600 l\n0 0 l\nh\nW\nn\n0 0 m\nS\n6 w\n0 0 0 1 k\n0 0 0 1 K\n1.9922 w\n300 -306 m\n4626 -306 l\nS\nQ\nQ\nq\n0 0 0 .90196 k\nBT\n/F3 79.167 Tf\n4200 -6522 Td\n(Page {current_page} of {max_page})Tj\n0 0 0 rg\nET\nQ\nQ";
    
        // Type data 
        this.Deposits = {"name": "Deposits", "title": "Deposits and other credits", "total_title": "Total deposits and other credits"};
        this.Withdrawals = {"name": "Withdrawals", "title": "Withdrawals and other debits", "total_title": "Total withdrawals and other debits"};

        // functions 
        this.numberFunction = new NumberFunction();
        this.typeFunction = new TypeFunction();
    }

    get_account_summary(statement, period, types){
        let result = this.AccountSummary;

        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);
        let deposits_value = this.typeFunction.get_deposits_value(period);
        let withdrawals_value = this.typeFunction.get_withdrawals_value(period);
        let days_in_cycle = this.typeFunction.get_days_in_cycle(period['period']);

        let average_balance = this.typeFunction.get_average_balance(period, types);

        // replace
        result = result.replace('{organization_name}', statement['organization']['name']);
        result = result.replaceAll('{company_name}', statement['company']['name']);
        result = result.replace('{company_address}', statement['company']['address']['address_line1'] + (statement['company']['address']['address_line1']!=''?', '+statement['company']['address']['address_line2']:''));
        result = result.replace('{company_address2}', statement['company']['address']['city'] + ', ' + statement['company']['address']['state']['short_name'] + ' ' + statement['company']['address']['postal']);
        result = result.replace('{max_page}', max_page);
        result = result.replaceAll('{start_period}', start_end_period['start']);
        result = result.replaceAll('{end_period}', start_end_period['end']);
        result = result.replace('{account_number}', period['account_number']);

        let negative = 0;
        if (this.#determine_is_negative(period['begining_balance'])) { negative = this.offset.account_summary.negative.x; }
        let digit = this.#determine_digit_of_amount(period['begining_balance']);

        result = result.replace('{begining_balance_x}', this.offset.account_summary[digit] - negative);
        result = result.replace('{begining_balance_x_minus}', this.offset.account_summary[digit]);
        result = result.replace('{begining_balance}', this.numberFunction.to_currency(period['begining_balance']));


        negative = 0;
        if (this.#determine_is_negative(period['ending_balance'])) { negative = this.offset.account_summary.negative.x; }
        digit = this.#determine_digit_of_amount(period['ending_balance']);

        result = result.replace('{ending_balance_x}', this.offset.account_summary.ending_balance[digit] - negative);
        result = result.replace('{ending_balance}', this.numberFunction.to_currency(period['ending_balance']));

        negative = 0;
        if (this.#determine_is_negative(deposits_value)) { negative = this.offset.account_summary.negative.x; }
        digit = this.#determine_digit_of_amount(deposits_value);

        result = result.replace('{deposits_x}', this.offset.account_summary[digit] - negative + (43));
        result = result.replace('{deposits_sum}', this.numberFunction.to_currency(deposits_value));

        negative = 0;
        if (this.#determine_is_negative(withdrawals_value)) { negative = this.offset.account_summary.negative.x; }
        digit = this.#determine_digit_of_amount(withdrawals_value);

        result = result.replace('{withdrawals_x}', this.offset.account_summary[digit] - negative + (43));
        result = result.replace('{withdrawals_sum}', this.numberFunction.to_currency(withdrawals_value));

        result = result.replace('{number_deposits}', this.typeFunction.get_deposits_count(period, types));
        result = result.replace('{number_withdrawals}', this.typeFunction.get_withdrawals_count(period, types));
        result = result.replace('{item_previous_cycle}', period['item_previous_cycle']);
        result = result.replace('{days_in_cycle}', days_in_cycle);
        result = result.replace('{average_balance}', this.numberFunction.to_currency(average_balance));

        return result;
    }

    get_importatnt_information(statement, period){
        let result = this.ImportantInformation;

        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);

        // replace
        result = result.replace('{company_name}', statement['company']['name']);
        result = result.replace('{account_number}', period['account_number']);
        result = result.replaceAll('{start_period}', start_end_period['start']);
        result = result.replaceAll('{end_period}', start_end_period['end']);
        result = result.replace('{max_page}', max_page);

        return result;
    }

    // in progress
    get_transactions(statement, period, page, types){

        let result = this.Transactions;
        if (page['page']%2!=0){ result = this.TransactionsNotMod2; }
        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);

        let pageContent = this.#get_transaction_content_with_real_data(period, page, types);

        // Header
        let header = this.#header(page);
        header = header.replace('{company_name}', statement['company']['name']);
        header = header.replace('{account_number}', period['account_number']);
        header = header.replace('{start_period}', start_end_period['start']);
        header = header.replace('{end_period}', start_end_period['end']);
        
        // Footer
        let footer = this.TransactionsFooterNotPicture; // TODO: Get from daatabase if has photo
        
        // Replace
        result = result.replace('{page_header}', header);
        result = result.replace('{max_page}', max_page);
        result = result.replace('{current_page}', page['page']);
        result = result.replace('{page_footer}', footer);
        result = result.replace('{type_first}', pageContent);

        return result;
    }

    // in func
    #start_end_period(date){
        let end_period = new Date(date);
        let start_period = new Date(end_period.getFullYear(), end_period.getMonth(), 1);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        let result = {
            'start': months[start_period.getMonth()] + ' ' + start_period.getDate() + ', ' + start_period.getFullYear(),
            'end': months[end_period.getMonth()] + ' ' + end_period.getDate() + ', ' + end_period.getFullYear()
        };

        return result;
    }

    // in func
    #max_page(period){
        let pages_count = period['pages'].length;
        let result = (pages_count%2==0?(pages_count+4):(pages_count+5));
        return result;
    }

    // in func
    #header(page){
        let result = '';
        if (page['page'] % 2==0){
            result = this.TransactionsMod2Header;
        }else{
            result = this.TransactionsNotMod2Header;
        }
        return result;
    }

    // in func
    #get_transaction_content_with_real_data(period, page, types){
        
        let typesOfPage = this.#get_types_of_page(period['pdf_content'], page);

        let resultContent1 = this.TransactionsTypeFirstNotMod2;
        let resultContent2 = this.TransactionsTypeSecond;

        if (page['page']%2==0){
            resultContent1 = this.TransactionsTypeFirstMod2;
        }

        let result = resultContent1;
        // all types in page
        for (let key in typesOfPage['lines']){
            // get type data
            let type = this.#determineType(typesOfPage['lines'][key]['type_id'], types);
            if (type['name']==this.Deposits.name){
                type= this.Deposits;
            }else if(type['name']==this.Withdrawals.name){
                type = this.Withdrawals;
            }
            
            // replacement
            if (key==0){ // first type
                if (page['page']%2==0){
                    result = result.replace('{x_position}', 5868);
                }else{
                    result = result.replace('{x_position}', 5418);
                }
            }else {
                result += resultContent2;
                result = result.replace('{x_position}', typesOfPage['transactions'][key-1]['second_type']-1275);
            }

            // if total
            let isTotal = false;
            if ('x' in typesOfPage['transactions'][key]['total_position']){
                isTotal = true;
            }

            // has continue on title
            result = result.replace('{type_title}', type['title']); 
            if (isTotal){
                result = result.replace('{if_continued}', ' - continued');
            }else{
                result = result.replace('{if_continued}', '');
            }

            result = result.replace('{type_transactions}', typesOfPage['transactions'][key]['content']);
            result = result.replace('{type_lines}', typesOfPage['lines'][key]['content']);

            
            // totals
            if (isTotal){
                let summary = this.TransactionsSummaryTotal; // continue {x_position} = // depends on last transaction amount digit number
                if (page['page']%2!=0){
                    summary = this.TransactionsSummaryTotalNotMod2;
                }

                result = result.replace('{type_summary}', summary);
                result = result.replace('{total_title}', type['total_title']);
                result = result.replace('{x_pos_block}', typesOfPage['transactions'][key]['total_position']['x']);
                result = result.replace('{y_pos_block}', typesOfPage['transactions'][key]['total_position']['y']);
                result = result.replace('{x_position}', typesOfPage['transactions'][key]['total_position']['x_summ']);
                let minus = '';
                let summ = typesOfPage['transactions'][key]['total_position']['summ'];
                if (parseFloat(typesOfPage['transactions'][key]['total_position']['summ'])<0){ 
                    minus = '-';
                    summ *= -1;
                }
                summ = this.numberFunction.to_currency(summ);
                result = result.replace('{total_sum}', minus + '$'+ summ);
            }else{ // continued
                let summary = this.TransactionsSummaryContinue;
                result = result.replace('{type_summary}', summary);
                result = result.replace('{x_position}', typesOfPage['transactions'][key]['continue_position']['x']); 
                result = result.replace('{y_position}', typesOfPage['transactions'][key]['continue_position']['y']); 
            }

        }

        result = result.replaceAll('\n\n', '\n');
        
        return result;
    }

    // in func
    #get_types_of_page(pdf_content_lines, page){
        let result = {};
        for (let key in pdf_content_lines['lines']){
            if (pdf_content_lines['lines'][key]['id']==page['id']){
                result['lines'] = pdf_content_lines['lines'][key]['types'];
                break;
            }
        }
        for (let key in pdf_content_lines['transactions']){
            if (pdf_content_lines['transactions'][key]['id']==page['id']){
                result['transactions'] = pdf_content_lines['transactions'][key]['types'];
                break;
            }
        }
        return result;
    }

    // in func
    #determineType(id, types){
        for (let key in types){
            if (id==types[key]['id']){
                return types[key];
            }
        }
    }

    get_service_fees(statement, period, current_page){
        let result = this.ServiceFees;

        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);
        let last_day_of_last_period = this.#last_day_of_last_period(period['period']);

        // replace
        result = result.replace('{company_name}', statement['company']['name']);
        result = result.replace('{account_number}', period['account_number']);
        result = result.replaceAll('{start_period}', start_end_period['start']);
        result = result.replaceAll('{end_period}', start_end_period['end']);
        result = result.replace('{current_page}', current_page);
        result = result.replace('{max_page}', max_page);
        result = result.replace('{last_day_of_last_month}', last_day_of_last_period);

        return result;
    }

    // in func
    #last_day_of_last_period(date){
        date = new Date(date);
        let result = new Date(date.getFullYear(), date.getMonth(), 0);
        result = (((result.getMonth()+1)<10?'0'+(result.getMonth()+1):(result.getMonth()+1))) + '/' +
                    (result.getDate()<10?'0'+result.getDate():result.getDate()) + '/' +
                    (result.getFullYear().toString().substr(2, 2));
        return result;
    }

    get_daily_balances(statement, period, types, current_page){
        let result = this.DailyBalances;

        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);

        let dailyBalances = this.#get_daily_balances_with_order(period, types);

        let dailyBalancesContent = this.#get_daily_balance_content_with_real_data(dailyBalances);
        
        // replace
        result = result.replace('{company_name}', statement['company']['name']);
        result = result.replace('{account_number}', period['account_number']);
        result = result.replaceAll('{start_period}', start_end_period['start']);
        result = result.replaceAll('{end_period}', start_end_period['end']);
        result = result.replace('{current_page}', current_page);
        result = result.replace('{max_page}', max_page);

        result = result.replace('{daily_block}', dailyBalancesContent);

        return result;
    }

    // in func
    #get_daily_balances_with_order(period, types){
        // table daily balance
        let tmpTableDailyBalance = this.typeFunction.get_table_daily_balance(period, types);
                
        // Artur formula
        let dailyBalances = [];
        let step = Math.ceil(tmpTableDailyBalance.length/3);
        for (let i=0; i < step; i++){
            for (let j=i; j<tmpTableDailyBalance.length; j+=step){
                dailyBalances.push(tmpTableDailyBalance[j]);
            }
        }
        return dailyBalances;
    }

    // in func
    #get_daily_balance_content_with_real_data(dailyBalances){
        let startX = -4189, startY = -157;
        let standartX = 300, standartY = -1309, standartLineX = -1205;
        let columnBetween = 1545, rowBetween = -130, linesBetween = 1410;

        let result = "", currentColumn = 1;
        let ifNotFirst = this.DailyBalancesDailyBlockIfNotFirst;
        for (let key in dailyBalances){
            let oneContent = this.DailyBalancesDailyBlock;
            let currentRow = Math.ceil((parseInt(key)+1)/3);
            if (key==0){ // first one
                // date pos
                oneContent = oneContent.replace('{if_not_first}', '');
                oneContent = oneContent.replace('{date_x_pos}', startX);
                oneContent = oneContent.replace('{date_y_pos}', startY);
            } else {
                oneContent = oneContent.replace('{if_not_first}', ifNotFirst);

                // date pos
                startX = standartX + ((currentColumn-1)*columnBetween);
                startY = standartY + ((currentRow-1)*rowBetween);
                oneContent = oneContent.replace('{date_x_pos}', startX);
                oneContent = oneContent.replace('{date_y_pos}', startY);
            }

            // replacement
            oneContent = oneContent.replace('{date}', dailyBalances[key]['date']);

            // amount pos
            let negative = 0;
            if (this.#determine_is_negative(dailyBalances[key]['ending_balance'])) { negative = this.offset.daily_balances.negative.x; }
            let digit = this.#determine_digit_of_amount(dailyBalances[key]['ending_balance']);

            oneContent = oneContent.replace('{amount_x_pos}', this.offset.daily_balances[digit] - negative);

            oneContent = oneContent.replace('{amount}', this.numberFunction.to_currency(dailyBalances[key]['ending_balance']));
            oneContent = oneContent.replaceAll('{lines1_x_pos}', (300 + ((currentColumn-1)*columnBetween)));
            oneContent = oneContent.replaceAll('{lines2_x_pos}', ((300+linesBetween) + ((currentColumn-1)*columnBetween)));

            oneContent = oneContent.replaceAll('{lines1_y_pos}', ((standartLineX) + ((currentRow-1)*rowBetween)));
            oneContent = oneContent.replaceAll('{lines2_y_pos}', ((standartLineX) + ((currentRow)*rowBetween)));

            result += oneContent;

            // change column
            currentColumn++;
            if (currentColumn>3){currentColumn=1;}
        }
        result = result.replaceAll('\n\n', '\n');
        result = result.replaceAll('\n\n\n', '\n');
        return result;
    }

    #determine_digit_of_amount(number){
        let digit = Math.abs(parseInt(number)).toString().length;
        if (digit>7){ digit = 7; } // tmp
        if (digit<3){ digit = 3; }
        return digit;
    }

    #determine_is_negative(number){
        if ((parseFloat(number)<0)){
            return true;
        }
        return false;
    }

    get_blank_page(statement, period, current_page){
        let result = this.BlankPage;

        let start_end_period = this.#start_end_period(period['period']);
        let max_page = this.#max_page(period);

        // replace
        result = result.replace('{company_name}', statement['company']['name']);
        result = result.replace('{account_number}', period['account_number']);
        result = result.replaceAll('{start_period}', start_end_period['start']);
        result = result.replaceAll('{end_period}', start_end_period['end']);
        result = result.replace('{current_page}', current_page);
        result = result.replace('{max_page}', max_page);

        return result;
    }  

}

export default PdfContent;