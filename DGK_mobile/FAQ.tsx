import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface FAQSection {
  title: string;
  questions: { question: string; answer: string[] }[];
}

const FAQ: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const faqData: FAQSection[] = [
    {
      title: 'Part 1: Introduction and General Information',
      questions: [
        {
          question: '1. What is the Digimine App?',
          answer: [
            'The Digimine App is an innovative digital platform that enables users to mine, manage, and trade Digikoins—digital tokens backed by physical gold measured in kilograms. By integrating blockchain technology with tangible assets, Digimine offers a secure, transparent, and efficient way to engage in digital asset mining and investment.',
            'Key Features:',
            '- Gold-Backed Digital Tokens: Each Digikoin represents ownership of a specific amount of physical gold, providing intrinsic value and stability.',
            '- User-Friendly Mining Interface: The app offers an intuitive interface for users to participate in mining activities, even without prior technical expertise.',
            '- Secure Transactions: Utilizing blockchain technology ensures that all transactions are transparent, immutable, and secure.',
            '- Real-Time Monitoring: Users can track their mining progress, token holdings, and market trends in real-time within the app.',
          ],
        },
        {
          question: '2. How does the gold backing of Digikoins work?',
          answer: [
            'Each Digikoin is directly linked to a specific amount of physical gold stored in secure, audited vaults. This linkage ensures that the value of Digikoins is intrinsically tied to the value of gold, providing stability and trust for users.',
            'Mechanism:',
            '- Gold Reserves: Digimine maintains physical gold reserves equivalent to the total number of Digikoins in circulation. These reserves are stored in high-security vaults and are subject to regular third-party audits to verify their existence and quantity.',
            '- Token Issuance: New Digikoins are minted only when additional physical gold is acquired and added to the reserves, maintaining a 1:1 ratio between Digikoins and gold holdings.',
            '- Transparency: Users have access to audit reports and real-time data on gold reserves through the app, ensuring full transparency and confidence in the gold backing of their digital assets.',
          ],
        },
        {
          question: '3. Is Digikoin a cryptocurrency or a digital asset?',
          answer: [
            'Digikoin is a hybrid digital asset that combines characteristics of traditional cryptocurrencies and asset-backed tokens.',
            'Classification:',
            '- Cryptocurrency Features: Like traditional cryptocurrencies, Digikoins can be mined, traded, and used for transactions within the Digimine ecosystem. They operate on a decentralized blockchain network, ensuring security and transparency.',
            '- Asset-Backed Features: Unlike typical cryptocurrencies, each Digikoin is backed by a specific amount of physical gold. This backing provides intrinsic value and reduces volatility, making Digikoins a stable digital asset.',
            'Regulatory Considerations:',
            'Depending on jurisdictional regulations, Digikoins may be classified differently. Users are encouraged to consult local regulations and seek professional advice to understand the legal status of Digikoins in their respective regions.',
          ],
        },
        {
          question: '4. How can I start mining Digikoins using the Digimine App?',
          answer: [
            'Starting your Digikoin mining journey with the Digimine App is a straightforward process designed for both beginners and experienced users.',
            'Steps to Begin Mining:',
            '- Download the App: Access the Digimine App from the official website or authorized app stores compatible with your device.',
            '- Create an Account: Register by providing necessary personal information and setting up secure login credentials.',
            '- Complete Verification: To comply with regulatory standards, complete the Know Your Customer (KYC) process by submitting required identification documents.',
            '- Set Up Mining Hardware: While the app facilitates mining, connecting compatible mining hardware can enhance efficiency. The app provides guidelines on recommended hardware specifications.',
            '- Start Mining: Once set up, navigate to the mining section within the app to initiate the mining process. The app offers real-time monitoring of your mining activities and earnings.',
            'Additional Resources:',
            '- User Guides: Detailed tutorials and guides are available within the app to assist users in optimizing their mining setup.',
            '- Customer Support: For personalized assistance, users can contact the support team via the app or official website.',
          ],
        },
        {
          question: '5. What are the system requirements for using the Digimine App?',
          answer: [
            'To ensure optimal performance, users should meet the following system requirements:',
            'For Mobile Devices:',
            '- Operating System: iOS 12.0 or later; Android 8.0 or later',
            '- Storage: Minimum of 150 MB of free space',
            '- Internet Connection: Stable broadband or Wi-Fi connection',
            'For Desktop Access:',
            '- Operating System: Windows 10 or later; macOS 10.14 or later',
            '- Browser Compatibility: Latest versions of Chrome, Firefox, Safari, or Edge',
            '- Internet Connection: Stable broadband connection',
            'Mining Hardware (Optional):',
            '- Processor: Multi-core CPU (e.g., Intel i5 or AMD Ryzen 5 and above)',
            '- Graphics Card: GPU with at least 4GB VRAM for enhanced mining performance',
            '- Memory: Minimum of 8GB RAM',
            '- Storage: SSD recommended for faster data processing',
            'Note: While the app can function on devices meeting the minimum requirements, higher specifications may improve performance, especially for users engaging in intensive mining activities.',
          ],
        },
      ],
    },
    {
      title: 'Part 2: Account Management and Security',
      questions: [
        {
          question: '6. How do I create and verify my account on the Digimine App?',
          answer: [
            'Creating and verifying your account on the Digimine App is essential to access all features and ensure compliance with security standards.',
            'Steps to Create and Verify Your Account:',
            '- Download the App: Access the Digimine App from the official website or authorized app stores compatible with your device.',
            '- Create an Account: Open the app and select "Sign Up." Provide the required personal information, including your full name, email address, and a secure password.',
            '- Email Verification: After registration, an email containing a verification link will be sent to the provided email address. Click on the verification link to confirm your email and activate your account.',
            '- Complete KYC (Know Your Customer) Process: Log in to the app and navigate to the account verification section. Submit necessary identification documents, such as a government-issued ID and proof of address, to comply with regulatory standards. The verification process may take up to 48 hours. You will receive a notification upon successful verification.',
            'Note: Ensuring accurate information and completing the KYC process promptly will facilitate seamless access to all Digimine App features.',
          ],
        },
        {
          question: '7. How can I reset my password if I’ve forgotten it?',
          answer: [
            'If you’ve forgotten your password, you can reset it through the Digimine App or the official website.',
            'Steps to Reset Your Password:',
            '- Access the Login Page: Open the Digimine App or visit the official website. Click on "Log In."',
            '- Initiate Password Reset: Click on the "Forgot Password?" link. Enter your registered email address and submit the request.',
            '- Receive Reset Instructions: An email with a password reset link will be sent to your registered email address. If you do not receive the email, check your spam or junk folder.',
            '- Reset Your Password: Click on the reset link provided in the email. Enter a new secure password and confirm it. Submit the new password to complete the process.',
            'Security Tip: Use a strong, unique password combining uppercase and lowercase letters, numbers, and special characters.',
          ],
        },
        {
          question: '8. How do I enable Two-Factor Authentication (2FA) for enhanced security?',
          answer: [
            'Enabling Two-Factor Authentication (2FA) adds an extra layer of security to your Digimine account.',
            'Steps to Enable 2FA:',
            '- Access Account Settings: Log in to your Digimine account. Navigate to "Account Settings" or "Security Settings."',
            '- Enable 2FA: Select the option to enable Two-Factor Authentication. Choose your preferred 2FA method:',
            '  - Authenticator App: Use apps like Google Authenticator or Authy.',
            '  - SMS Verification: Receive codes via text message.',
            '- Set Up 2FA:',
            '  - For Authenticator App: Scan the QR code displayed on the screen using your authenticator app. Enter the generated code to confirm setup.',
            '  - For SMS Verification: Enter your mobile phone number. Enter the verification code sent to your phone.',
            '- Backup Codes: After enabling 2FA, you will receive backup codes. Store these codes securely; they can be used to access your account if you lose access to your primary 2FA method.',
            'Note: Enabling 2FA significantly enhances the security of your account by requiring a second form of verification during login.',
          ],
        },
        {
          question: '9. What should I do if I suspect unauthorized access to my account?',
          answer: [
            'If you suspect unauthorized access to your Digimine account, take immediate action to secure your account.',
            'Immediate Steps:',
            '- Change Your Password: Log in to your account and change your password immediately. If you cannot log in, use the "Forgot Password?" feature to reset your password.',
            '- Review Account Activity: Check your account for any unauthorized transactions or changes. Note any unfamiliar activity and record the details.',
            '- Enable or Verify 2FA: Ensure that Two-Factor Authentication is enabled on your account. If already enabled, verify that your 2FA settings have not been altered.',
            '- Contact Support: Reach out to Digimine Support immediately to report the issue. Provide them with details of the unauthorized access and any actions you’ve taken.',
            'Preventive Measures:',
            '- Regularly Update Passwords: Change your passwords periodically and avoid using the same password across multiple platforms.',
            '- Monitor Account Activity: Regularly review your account statements and activity logs for any discrepancies.',
            '- Be Cautious of Phishing Attempts: Avoid clicking on suspicious links or providing personal information to unverified sources.',
          ],
        },
      ],
    },
    {
      title: 'Part 3: Transactions and Wallet Management',
      questions: [
        {
          question: '10. How do I deposit funds into my Digimine wallet?',
          answer: [
            'Depositing funds into your Digimine wallet is a straightforward process designed to accommodate both fiat currencies and cryptocurrencies.',
            'Steps to Deposit Funds:',
            '- Log In to Your Account: Open the Digimine App and enter your login credentials.',
            '- Navigate to the Wallet Section: Tap on the "Wallet" icon located on the app’s main dashboard.',
            '- Select Deposit: Choose the "Deposit" option to initiate the process.',
            '- Choose Your Deposit Method:',
            '  - Fiat Currency: Select your preferred fiat currency (e.g., USD, EUR). Follow the on-screen instructions to link your bank account or enter your payment details. Confirm the transaction.',
            '  - Cryptocurrency: Select the cryptocurrency you wish to deposit (e.g., Bitcoin, Ethereum). The app will generate a unique wallet address (QR code and alphanumeric). Use your external crypto wallet to send the desired amount to the provided address.',
            'Important Considerations:',
            '- Minimum Deposit Amounts: Ensure that your deposit meets the minimum amount required for the selected currency or cryptocurrency.',
            '- Processing Times: Fiat deposits may take 1-3 business days, while cryptocurrency deposits depend on network congestion.',
            '- Deposit Fees: Review any applicable fees associated with deposits, which will be displayed before you confirm the transaction.',
          ],
        },
        {
          question: '11. How can I withdraw funds from my Digimine wallet?',
          answer: [
            'Withdrawing funds from your Digimine wallet is designed to be secure and user-friendly, allowing you to access your assets as needed.',
            'Steps to Withdraw Funds:',
            '- Access Your Wallet: Log in to the Digimine App. Navigate to the "Wallet" section.',
            '- Initiate a Withdrawal: Tap on the "Withdraw" option.',
            '- Select Withdrawal Method:',
            '  - Fiat Currency: Choose the fiat currency you wish to withdraw. Enter the amount. Provide your bank account details if not already saved. Confirm the transaction.',
            '  - Cryptocurrency: Select the cryptocurrency to withdraw. Enter the destination wallet address carefully. Specify the amount. Confirm the transaction.',
            'Security Measures:',
            '- Two-Factor Authentication (2FA): Ensure 2FA is enabled on your account to add an extra layer of security.',
            '- Withdrawal Limits: Be aware of daily or monthly withdrawal limits, which can be viewed in your account settings.',
            '- Verification: For large withdrawals, additional verification may be required to protect your assets.',
            'Note: Always double-check withdrawal details, especially cryptocurrency addresses, as transactions cannot be reversed once processed.',
          ],
        },
        {
          question: '12. What are the fees associated with transactions on Digimine?',
          answer: [
            'Digimine is committed to maintaining transparency regarding fees associated with various transactions on the platform.',
            'Fee Structure:',
            '- Trading Fees: Buying/Selling Digikoins: A standard fee of 0.25% per transaction is applied. Peer-to-Peer (P2P) Transactions: A nominal fee of 0.10% is charged to the sender.',
            '- Deposit Fees: Fiat Currency Deposits: No fees are charged for deposits made via bank transfers. Cryptocurrency Deposits: Digimine does not impose deposit fees; however, standard network fees apply.',
            '- Withdrawal Fees: Fiat Currency Withdrawals: A fee of $5 or equivalent per transaction. Cryptocurrency Withdrawals: Fees vary depending on the specific cryptocurrency and current network conditions.',
            'Additional Considerations:',
            '- Inactivity Fee: Accounts inactive for more than 12 months may incur a monthly fee of $10 or equivalent.',
            '- Account Maintenance: No fees are charged for account creation or maintenance.',
            'Note: Fee structures are subject to change. Users will be notified of any updates via email and in-app notifications.',
          ],
        },
        {
          question: '13. How do I transfer Digikoins to another user?',
          answer: [
            'Transferring Digikoins to another user within the Digimine ecosystem is a secure and straightforward process.',
            'Steps to Transfer Digikoins:',
            '- Log In to Your Account: Access your Digimine App using your credentials.',
            '- Navigate to the Transfer Section: Tap on the "Transfer" icon located on the main dashboard.',
            '- Enter Recipient Details: Input the recipient’s Digimine username or wallet address. Ensure the information is accurate.',
            '- Specify Transfer Amount: Enter the number of Digikoins you wish to send. Review the current balance to ensure sufficient funds.',
            '- Review and Confirm: Double-check all details, including recipient information and transfer amount. Confirm the transaction.',
            '- Authentication: If Two-Factor Authentication (2FA) is enabled, enter the verification code sent to your device.',
            '- Completion: Upon successful authentication, the Digikoins will be transferred to the recipient’s account.',
            'Important Considerations:',
            '- Transaction Fees: A nominal fee may apply for transfers. The exact fee will be displayed before you confirm.',
            '- Processing Time: Transfers are typically processed instantly; however, slight delays may occur due to network congestion.',
            '- Irreversible Transactions: Once confirmed, transactions cannot be reversed. Always verify recipient details carefully.',
            'Security Tip: Enable Two-Factor Authentication (2FA) to add an extra layer of security.',
          ],
        },
        {
          question: '14. How can I view my transaction history?',
          answer: [
            'Monitoring your transaction history is essential for managing your Digimine account effectively.',
            'Steps to View Transaction History:',
            '- Access Your Account: Log in to the Digimine App with your credentials.',
            '- Navigate to the Wallet Section: Tap on the "Wallet" icon on the main dashboard.',
            '- View Transaction History: Select the "Transaction History" tab. A list of all your transactions will be displayed.',
            '- Filter Transactions: Use the filter options to sort transactions by date, type, or status.',
            '- Transaction Details: Tap on any transaction to view detailed information, such as:',
            '  - Transaction ID',
            '  - Date and time',
            '  - Amount',
            '  - Recipient or sender details',
            '  - Transaction status',
            '- Exporting Transaction History: For record-keeping or tax purposes, you can export your transaction history:',
            '  - Tap on the "Export" button within the transaction history section.',
            '  - Choose your preferred format (e.g., CSV, PDF).',
            '  - The file will be generated and can be saved to your device or sent to your email.',
            'Note: Regularly reviewing your transaction history helps in tracking your activities and identifying any unauthorized transactions promptly.',
          ],
        },
        {
          question: '15. What should I do if a transaction fails or is pending for too long?',
          answer: [
            'Occasionally, transactions may fail or remain pending longer than expected. Here’s how to address such issues.',
            'Steps to Resolve Transaction Issues:',
            '- Check Transaction Status: Navigate to your "Transaction History" in the Digimine App. Identify the transaction in question and note its status.',
            '- Review Transaction Details: Ensure all details, such as recipient information and amounts, are correct.',
            '- Network Confirmation: Cryptocurrency transactions require network confirmations. Delays can occur due to network congestion. Use the transaction ID to check the status on the respective blockchain explorer.',
            '- Contact Support: If the transaction remains unresolved, reach out to Digimine Support via the app or email at support@digimine.com. Provide detailed information, including:',
            '  - Transaction ID',
            '  - Date and time of the transaction',
            '  - Amount involved',
            '  - Any error messages received',
            'Preventive Measures:',
            '- Double-Check Details: Always verify transaction details before confirmation to prevent errors.',
            '- Adequate Network Fees: For cryptocurrency transactions, ensure that the network fee is adequate.',
            '- Stable Internet Connection: A reliable internet connection can prevent interruptions during transaction processing.',
            'Note: While Digimine strives to process all transactions promptly, external factors such as blockchain network congestion can cause delays.',
          ],
        },
      ],
    },
    {
      title: 'Part 4: Mining Operations and Rewards',
      questions: [
        {
          question: '16. What mining algorithms does the Digimine App support?',
          answer: [
            'The Digimine App is designed to support multiple mining algorithms to accommodate a diverse range of mining hardware and preferences.',
            'Supported Mining Algorithms:',
            '- SHA-256: Commonly used in Bitcoin mining, suitable for ASIC miners.',
            '- Ethash: Used for Ethereum mining, optimized for GPU miners.',
            '- Scrypt: Employed by various altcoins, compatible with both ASIC and GPU miners.',
            'Selecting the Appropriate Algorithm:',
            '- Hardware Compatibility: Ensure your mining hardware is compatible with the chosen algorithm.',
            '- Network Difficulty: Consider the current network difficulty of each algorithm to assess potential profitability.',
            '- Energy Consumption: Evaluate the energy requirements of each algorithm relative to your hardware.',
            'Note: Regularly updating the Digimine App ensures access to the latest supported algorithms and optimal mining performance.',
          ],
        },
        {
          question: '17. How are mining rewards calculated and distributed?',
          answer: [
            'Mining rewards within the Digimine ecosystem are determined based on a combination of factors, ensuring a fair and transparent distribution among participants.',
            'Factors Influencing Mining Rewards:',
            '- Hash Rate Contribution: The computational power you contribute to the network directly impacts your share of the rewards.',
            '- Network Difficulty: As more miners participate, the complexity of mining increases, affecting individual rewards.',
            '- Block Reward: The fixed amount of Digikoins awarded for each successfully mined block.',
            'Distribution Process:',
            '- Block Validation: Miners solve complex algorithms to validate transactions and add new blocks to the blockchain.',
            '- Reward Allocation: Upon successful block addition, the block reward is distributed among miners proportionally to their hash rate contribution.',
            '- Payout Schedule: Accumulated rewards are credited to miners’ wallets at regular intervals, typically daily or upon reaching a minimum threshold.',
            'Transparency Measures:',
            '- Real-Time Monitoring: The Digimine App provides real-time tracking of your mining performance and estimated rewards.',
            '- Detailed Reports: Access comprehensive reports detailing your mining activities, earnings, and payout history within the app.',
            'Note: Staying informed about network changes and adjusting your mining strategies accordingly can optimize your rewards.',
          ],
        },
        {
          question: '18. Are there any mining fees associated with the Digimine App?',
          answer: [
            'Yes, the Digimine App implements nominal fees to maintain and enhance the mining infrastructure, ensuring a seamless experience for all users.',
            'Types of Fees:',
            '- Pool Fee: A small percentage deducted from mining rewards for participants in the Digimine mining pool. This fee covers operational costs and infrastructure maintenance.',
            '- Transaction Fee: Applicable when transferring Digikoins from your in-app wallet to external wallets or exchanges.',
            'Fee Structure:',
            '- Pool Fee Rate: Typically ranges between 1% to 2% of the mining rewards, depending on the specific mining pool and algorithm used.',
            '- Transaction Fee Rate: Varies based on network congestion and transaction size; the app provides an estimate before confirmation.',
            'Transparency and Updates:',
            '- Fee Disclosure: All applicable fees are transparently displayed within the app before initiating any transaction or mining activity.',
            '- Notifications: Users receive timely notifications regarding any changes to the fee structure.',
            'Note: Regularly reviewing the fee schedule within the app can help you manage and optimize your mining operations effectively.',
          ],
        },
      ],
    },
    {
      title: 'Part 5: Regulatory and Compliance',
      questions: [
        {
          question: '19. Is the Digimine App compliant with international regulations?',
          answer: [
            'The Digimine App is committed to adhering to international laws and regulations governing digital assets and financial transactions.',
            'Compliance Measures:',
            '- Know Your Customer (KYC): Users are required to verify their identity during account creation to prevent fraud and ensure compliance with anti-money laundering (AML) regulations.',
            '- Data Protection: User data is handled in accordance with global data protection standards, ensuring privacy and security.',
            '- Regular Audits: The platform undergoes periodic audits by independent third parties to ensure transparency and adherence to regulatory standards.',
            'Jurisdictional Considerations:',
            '- Regional Restrictions: Some countries may have specific regulations or restrictions regarding cryptocurrency mining and trading. Users are advised to consult local laws.',
            '- Legal Counsel: For clarity on specific legal obligations, users may consider seeking advice from legal professionals.',
            'Note: Digimine continuously monitors the regulatory landscape to adapt and ensure ongoing compliance.',
          ],
        },
        {
          question: '20. How does Digimine ensure the security of user data and assets?',
          answer: [
            'Ensuring the security of user data and assets is a top priority for Digimine. The platform employs a multi-layered security approach to protect against potential threats.',
            'Security Measures:',
            '- Encryption: All data transmitted between users and the Digimine servers is encrypted using industry-standard SSL/TLS protocols.',
            '- Two-Factor Authentication (2FA): Users are encouraged to enable 2FA to add an extra layer of security to their accounts.',
            '- Cold Storage: A significant portion of digital assets is stored in offline wallets, minimizing exposure to online threats.',
            '- Regular Security Audits: The platform undergoes frequent security assessments and penetration testing.',
            'User Responsibilities:',
            '- Strong Passwords: Create complex passwords combining uppercase and lowercase letters, numbers, and special characters.',
            '- Regular Updates: Periodically update your password and avoid reusing passwords across different platforms.',
            '- Secure Storage: Store your passwords securely using reputable password managers.',
            '- Two-Factor Authentication (2FA): Enable 2FA to add an extra layer of security.',
            '- Device Security: Ensure that the devices you use are protected with up-to-date antivirus software.',
            '- Phishing Awareness: Be cautious of unsolicited communications asking for your account details.',
            '- Regular Monitoring: Frequently review your account activity for any unauthorized actions.',
            'Note: Maintaining robust security for your Digimine account is a shared responsibility.',
          ],
        },
      ],
    },
    {
      title: 'Part 6: Technical Support and Troubleshooting',
      questions: [
        {
          question: '21. What should I do if I encounter technical issues with the Digimine App?',
          answer: [
            'If you experience technical difficulties with the Digimine App, follow these steps to resolve the issue:',
            '- Restart the App: Close the app completely and reopen it to see if the issue persists.',
            '- Check for Updates: Ensure that you are using the latest version of the app. Visit your device’s app store to check for updates.',
            '- Verify Internet Connection: Confirm that your device has a stable internet connection.',
            '- Clear Cache/Data: Navigate to your device’s settings, find the Digimine App, and clear its cache.',
            '- Reinstall the App: Uninstall the Digimine App and reinstall it from the official app store.',
            '- Contact Support: If the problem persists, reach out to Digimine Support with detailed information about the issue.',
            'Note: Providing comprehensive details when contacting support will facilitate a quicker resolution.',
          ],
        },
        {
          question: '22. How can I contact Digimine Support for assistance?',
          answer: [
            'Digimine offers multiple channels for customer support to address your inquiries and issues:',
            '- In-App Support: Access the "Help" or "Support" section within the Digimine App to find FAQs and contact options.',
            '- Email Support: Send an email detailing your issue to support@digimine.com. Include your account information and a clear description.',
            '- Live Chat: Visit the official Digimine website and use the live chat feature for real-time assistance during business hours.',
            '- Community Forums: Engage with other users and find solutions in the Digimine Community Forums.',
            'Note: Response times may vary based on the volume of inquiries, but the support team strives to address all issues promptly.',
          ],
        },
        {
          question: '23. Where can I find tutorials or guides on using the Digimine App?',
          answer: [
            'To help users navigate and utilize the Digimine App effectively, several resources are available:',
            '- In-App Tutorials: Upon first use, the app provides guided tutorials highlighting key features and functionalities.',
            '- Help Center: Access the "Help Center" within the app or on the official website to find articles and guides.',
            '- Video Tutorials: Visit the Digimine YouTube channel for visual guides and walkthroughs.',
            '- Webinars and Workshops: Participate in live or recorded sessions hosted by Digimine experts.',
            'Note: Regularly exploring these resources can enhance your proficiency with the app.',
          ],
        },
        {
          question: '24. What should I do if I forget my account password?',
          answer: [
            'If you’ve forgotten your Digimine account password, you can reset it by following these steps:',
            'Initiate Password Reset:',
            '- On the Digimine App login screen, tap "Forgot Password?"',
            '- Enter Registered Email: Provide the email address associated with your Digimine account.',
            'Check Your Email:',
            '- Look for a password reset email from Digimine. If it’s not in your inbox, check your spam or junk folder.',
            'Follow Reset Link:',
            '- Click the link provided in the email to open the password reset page.',
            'Set New Password:',
            '- Enter a new, strong password and confirm it.',
            'Confirm and Log In:',
            '- Submit the new password and use it to log in to your account.',
            'Note: If you do not receive the reset email within a few minutes, ensure you’ve entered the correct email address and try again.',
          ],
        },
        {
          question: '25. How do I report a bug or provide feedback about the Digimine App?',
          answer: [
            'User feedback is invaluable for the continuous improvement of the Digimine App. To report bugs or provide suggestions, you can utilize the following methods:',
            'In-App Feedback:',
            '- Access the Feedback Section: Navigate to the "Settings" or "Help" section within the Digimine App. Select "Report a Problem" or "Send Feedback."',
            '- Provide Detailed Information: Describe the issue or suggestion clearly and concisely. Include steps to reproduce the issue, if applicable.',
            '- Submit the Report: After completing the form, tap "Submit" to send your feedback.',
            'Email Support:',
            '- Send an email detailing the bug or feedback to support@digimine.com. Include:',
            '  - A clear description of the issue or suggestion.',
            '  - Steps to reproduce the problem, if applicable.',
            '  - Your device model and operating system version.',
            'Community Forums:',
            '- Share experiences and solutions in the Digimine Community Forums.',
            'Important Considerations:',
            '- Reproduce the Issue: Before reporting, try to reproduce the bug to provide accurate steps.',
            '- Provide Comprehensive Details: The more information you provide, the easier it will be for the team to resolve the issue.',
            '- Stay Updated: Keep your app updated to the latest version.',
            'By following these steps, you contribute significantly to enhancing the Digimine App experience for all users.',
          ],
        },
      ],
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <ScrollView className="flex-1 mt-[70px] p-5 bg-gray-200/85">
      <View className="mb-5">
        <Text className="text-3xl font-bold text-[#050142] mb-2">Frequently Asked Questions (FAQ)</Text>
        <Text className="text-lg text-[#454545]">
          <Text className="font-bold">Last Updated:</Text> 19/02/2025
        </Text>
        <Text className="text-base text-[#454545] mt-2">
          This document serves as an official and comprehensive guide to the Digimine App, addressing a wide range of questions to assist users in understanding and utilizing the platform effectively.
        </Text>
      </View>

      {faqData.map((section, index) => (
        <View key={index} className="mb-4">
          <TouchableOpacity
            className="p-4 bg-[#050142] rounded-t-[10px] flex-row justify-between items-center"
            onPress={() => toggleSection(index)}
            accessibilityLabel={section.title}
          >
            <Text className="text-xl font-bold text-white">{section.title}</Text>
            <Text className="text-white text-lg">{expandedSection === index ? '−' : '+'}</Text>
          </TouchableOpacity>
          {expandedSection === index && (
            <View className="p-4 bg-white/10 rounded-b-[10px] shadow-sm">
              {section.questions.map((item, qIndex) => (
                <View key={qIndex} className="mb-3">
                  <Text className="text-lg font-semibold text-[#454545] mb-1">{item.question}</Text>
                  {item.answer.map((paragraph, pIndex) => (
                    <Text key={pIndex} className="text-base text-[#454545] mb-1">
                      {paragraph.startsWith('- ') ? '• ' + paragraph.slice(2) : paragraph}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQ;