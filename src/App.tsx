import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'

// Layouts
import AdminLayout from '@/layouts/AdminLayout'
import EmployeeLayout from '@/layouts/EmployeeLayout'
import ManagerLayout from '@/layouts/ManagerLayout'
import HRLayout from '@/layouts/HRLayout'
import AuditorLayout from '@/layouts/AuditorLayout'
import TrainerLayout from '@/layouts/TrainerLayout'

// Dashboard Pages
import DashboardPage from '@/pages/admin/DashboardPage'
import EmployeeDashboard from '@/pages/employee/EmployeeDashboard'
import ManagerDashboard from '@/pages/manager/ManagerDashboard'
import HRDashboard from '@/pages/hr/HRDashboard'
import AuditorDashboard from '@/pages/auditor/AuditorDashboard'
import TrainerDashboard from '@/pages/trainer/TrainerDashboard'

// Employee Pages
import ProfilePage from '@/pages/employee/ProfilePage'
import TimeTrackingPage from '@/pages/employee/TimeTrackingPage'
import AttendancePage from '@/pages/employee/AttendancePage'
import OvertimePage from '@/pages/employee/OvertimePage'
import LeaveRequestPage from '@/pages/employee/LeaveRequestPage'
import LeaveHistoryPage from '@/pages/employee/LeaveHistoryPage'
import LeaveBalancePage from '@/pages/employee/LeaveBalancePage'
import PaystubsPage from '@/pages/employee/PaystubsPage'
import TaxDocsPage from '@/pages/employee/TaxDocsPage'
import BenefitsPage from '@/pages/employee/BenefitsPage'
import PerformancePage from '@/pages/employee/PerformancePage'
import GoalsPage from '@/pages/employee/GoalsPage'
import FeedbackPage from '@/pages/employee/FeedbackPage'
import TrainingPage from '@/pages/employee/TrainingPage'
import EmployeeCertificationsPage from '@/pages/admin/CertificationsPage'
import SkillsPage from '@/pages/employee/SkillsPage'
import DocumentsPage from '@/pages/employee/DocumentsPage'
import PoliciesPage from '@/pages/employee/PoliciesPage'
import HandbookPage from '@/pages/employee/HandbookPage'
import InternalJobsPage from '@/pages/employee/InternalJobsPage'
import CareerPathPage from '@/pages/employee/CareerPathPage'
import MentorshipPage from '@/pages/employee/MentorshipPage'
import DirectoryPage from '@/pages/employee/DirectoryPage'
import MessagesPage from '@/pages/employee/MessagesPage'
import SettingsPage from '@/pages/employee/SettingsPage'

// Admin Pages
import EmployeesPage from '@/pages/admin/EmployeesPage'
import DepartmentsPage from '@/pages/admin/DepartmentsPage'
import PositionsPage from '@/pages/admin/PositionsPage'
import AdminDirectoryPage from '@/pages/admin/DirectoryPage'
import PayrollPage from '@/pages/admin/PayrollPage'
import JobsPage from '@/pages/admin/JobsPage'
import CandidatesPage from '@/pages/admin/CandidatesPage'
import InterviewsPage from '@/pages/admin/InterviewsPage'
import PipelinePage from '@/pages/admin/PipelinePage'
import SalariesPage from '@/pages/admin/SalariesPage'
import AdminTimeTrackingPage from '@/pages/admin/TimeTrackingPage'
import AdminAttendancePage from '@/pages/admin/AttendancePage'
import AdminLeavePage from '@/pages/admin/LeavePage'
import AdminOvertimePage from '@/pages/admin/OvertimePage'
import AdminPerformancePage from '@/pages/admin/PerformancePage'
import AdminGoalsPage from '@/pages/admin/GoalsPage'
import AdminTrainingPage from '@/pages/admin/TrainingPage'
import AdminFeedbackPage from '@/pages/admin/FeedbackPage'
import AdminDocumentsPage from '@/pages/admin/DocumentsPage'
import ContractsPage from '@/pages/admin/ContractsPage'
import AdminPoliciesPage from '@/pages/admin/PoliciesPage'
import TemplatesPage from '@/pages/admin/TemplatesPage'
import AdminCompliancePage from '@/pages/admin/CompliancePage'
import AuditPage from '@/pages/admin/AuditPage'
import AdminReportsPage from '@/pages/admin/ReportsPage'
import AdminCertificationsPage from '@/pages/admin/CertificationsPage'
import AdminCalendarPage from '@/pages/admin/CalendarPage'
import AdminMessagesPage from '@/pages/admin/MessagesPage'
import AdminSettingsPage from '@/pages/admin/SettingsPage'
import AdminBenefitsPage from '@/pages/admin/BenefitsPage'
import TaxReportsPage from '@/pages/admin/TaxReportsPage'

// Auditor Pages
import CompliancePage from '@/pages/auditor/CompliancePage'
import PolicyAdherencePage from '@/pages/auditor/PolicyAdherencePage'
import RegulatoryReportsPage from '@/pages/auditor/RegulatoryReportsPage'
import RiskAssessmentPage from '@/pages/auditor/RiskAssessmentPage'
import ViolationsPage from '@/pages/auditor/ViolationsPage'
import ActivityLogsPage from '@/pages/auditor/ActivityLogsPage'
import AccessLogsPage from '@/pages/auditor/AccessLogsPage'
import ChangeHistoryPage from '@/pages/auditor/ChangeHistoryPage'
import SecurityEventsPage from '@/pages/auditor/SecurityEventsPage'
import FailedLoginsPage from '@/pages/auditor/FailedLoginsPage'
import PayrollAuditPage from '@/pages/auditor/PayrollAuditPage'
import ExpenseAuditPage from '@/pages/auditor/ExpenseAuditPage'
import SalaryDiscrepanciesPage from '@/pages/auditor/SalaryDiscrepanciesPage'
import TaxCompliancePage from '@/pages/auditor/TaxCompliancePage'
import BudgetAnalysisPage from '@/pages/auditor/BudgetAnalysisPage'
import EmployeeRecordsPage from '@/pages/auditor/EmployeeRecordsPage'
import DocumentVerificationPage from '@/pages/auditor/DocumentVerificationPage'
import ContractCompliancePage from '@/pages/auditor/ContractCompliancePage'
import LeaveAttendancePage from '@/pages/auditor/LeaveAttendancePage'
import PerformanceRecordsPage from '@/pages/auditor/PerformanceRecordsPage'
import AuditorDocumentsPage from '@/pages/auditor/DocumentsPage'
import DocumentVersionsPage from '@/pages/auditor/DocumentVersionsPage'
import AccessControlPage from '@/pages/auditor/AccessControlPage'
import DocumentExpiryPage from '@/pages/auditor/DocumentExpiryPage'
import DigitalSignaturesPage from '@/pages/auditor/DigitalSignaturesPage'
import AuditReportsPage from '@/pages/auditor/AuditReportsPage'
import ComplianceDashboardPage from '@/pages/auditor/ComplianceDashboardPage'
import TrendAnalysisPage from '@/pages/auditor/TrendAnalysisPage'
import CustomReportsPage from '@/pages/auditor/CustomReportsPage'
import ExecutiveSummaryPage from '@/pages/auditor/ExecutiveSummaryPage'
import DataPrivacyPage from '@/pages/auditor/DataPrivacyPage'
import GDPRPage from '@/pages/auditor/GDPRPage'
import DataProcessingPage from '@/pages/auditor/DataProcessingPage'
import ConsentManagementPage from '@/pages/auditor/ConsentManagementPage'
import DataBreachesPage from '@/pages/auditor/DataBreachesPage'
import AdvancedSearchPage from '@/pages/auditor/AdvancedSearchPage'
import InvestigationsPage from '@/pages/auditor/InvestigationsPage'
import ForensicAnalysisPage from '@/pages/auditor/ForensicAnalysisPage'
import EvidencePage from '@/pages/auditor/EvidencePage'
import ExportsPage from '@/pages/auditor/ExportsPage'
import AuditorProfilePage from '@/pages/auditor/ProfilePage'
import AuditorSettingsPage from '@/pages/auditor/SettingsPage'

// HR Pages
import HREmployeesPage from '@/pages/hr/EmployeesPage'
import OnboardingPage from '@/pages/hr/OnboardingPage'
import HRDirectoryPage from '@/pages/hr/DirectoryPage'
import OrgChartPage from '@/pages/hr/OrgChartPage'
import EmployeeAnalyticsPage from '@/pages/hr/EmployeeAnalyticsPage'
import HRJobsPage from '@/pages/hr/JobsPage'
import HRCandidatesPage from '@/pages/hr/CandidatesPage'
import HRInterviewsPage from '@/pages/hr/InterviewsPage'
import HRPipelinePage from '@/pages/hr/PipelinePage'
import TalentPoolPage from '@/pages/hr/TalentPoolPage'
import HRPayrollPage from '@/pages/hr/PayrollPage'
import HRSalariesPage from '@/pages/hr/SalariesPage'
import HRBenefitsPage from '@/pages/hr/BenefitsPage'
import HRTimeTrackingPage from '@/pages/hr/TimeTrackingPage'
import HRAttendancePage from '@/pages/hr/AttendancePage'
import HRLeavePage from '@/pages/hr/LeavePage'
import HROvertimePage from '@/pages/hr/OvertimePage'
import SchedulesPage from '@/pages/hr/SchedulesPage'
import HRPerformancePage from '@/pages/hr/PerformancePage'
import HRDepartmentsPage from '@/pages/hr/DepartmentsPage'
import HRPoliciesPage from '@/pages/hr/PoliciesPage'
import HRTeamsPage from '@/pages/hr/TeamsPage'
import HRLocationsPage from '@/pages/hr/LocationsPage'
import HRHierarchyPage from '@/pages/hr/HierarchyPage'
import HRCalendarPage from '@/pages/hr/CalendarPage'
import HRCareerDevelopmentPage from '@/pages/hr/CareerDevelopmentPage'
import HRIntegrationsPage from '@/pages/hr/IntegrationsPage'
import HRCertificationsPage from '@/pages/hr/CertificationsPage'
import HRPredictivePage from '@/pages/hr/PredictivePage'
import HRSystemSettingsPage from '@/pages/hr/SystemSettingsPage'
import HRMessagesPage from '@/pages/hr/MessagesPage'
import HRProfilePage from '@/pages/hr/ProfilePage'
import HRMentorshipPage from '@/pages/hr/MentorshipPage'
import HRSettingsPage from '@/pages/hr/SettingsPage'
import HRLearningAnalyticsPage from '@/pages/hr/LearningAnalyticsPage'
import HRSkillsPage from '@/pages/hr/SkillsPage'
import HRUserManagementPage from '@/pages/hr/UserManagementPage'
import HRExecutiveReportsPage from '@/pages/hr/ExecutiveReportsPage'
import HRWorkforceAnalyticsPage from '@/pages/hr/WorkforceAnalyticsPage'
import HRReportsPage from '@/pages/hr/ReportsPage'
import HRPrivacyPage from '@/pages/hr/PrivacyPage'
import HRRiskPage from '@/pages/hr/RiskPage'
import HRLegalPage from '@/pages/hr/LegalPage'
import HRAuditPage from '@/pages/hr/AuditPage'
import HRTemplatesPage from '@/pages/hr/TemplatesPage'
import HRReportingPage from '@/pages/hr/ReportingPage'
import HRFeedbackPage from '@/pages/hr/FeedbackPage'
import HRPerformanceAnalyticsPage from '@/pages/hr/PerformanceAnalyticsPage'
import HRCompensationAnalyticsPage from '@/pages/hr/CompensationAnalyticsPage'
import HRTaxManagementPage from '@/pages/hr/TaxManagementPage'
import HRPositionsPage from '@/pages/hr/PositionsPage'
import HRContractsPage from '@/pages/hr/ContractsPage'
import HRHandbookPage from '@/pages/hr/HandbookPage'
import HRDocumentsPage from '@/pages/hr/DocumentsPage'
import HRGoalsPage from '@/pages/hr/GoalsPage'
import HRAnalyticsPage from '@/pages/hr/HRAnalyticsPage'
import HRTrainingPage from '@/pages/hr/TrainingPage'
import HRCostCentersPage from '@/pages/hr/CostCentersPage'
import HRCompliancePage from '@/pages/hr/CompliancePage'
import HRDataManagementPage from '@/pages/hr/DataManagementPage'
import HRRolesPage from '@/pages/hr/RolesPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="positions" element={<PositionsPage />} />
            <Route path="directory" element={<AdminDirectoryPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="salaries" element={<SalariesPage />} />
            <Route path="benefits" element={<AdminBenefitsPage />} />
            <Route path="tax-reports" element={<TaxReportsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="interviews" element={<InterviewsPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="time-tracking" element={<AdminTimeTrackingPage />} />
            <Route path="attendance" element={<AdminAttendancePage />} />
            <Route path="leave" element={<AdminLeavePage />} />
            <Route path="overtime" element={<AdminOvertimePage />} />
            <Route path="performance" element={<AdminPerformancePage />} />
            <Route path="goals" element={<AdminGoalsPage />} />
            <Route path="training" element={<AdminTrainingPage />} />
            <Route path="feedback" element={<AdminFeedbackPage />} />
            <Route path="documents" element={<AdminDocumentsPage />} />
            <Route path="contracts" element={<ContractsPage />} />
            <Route path="policies" element={<AdminPoliciesPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="compliance" element={<AdminCompliancePage />} />
            <Route path="audit" element={<AuditPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="certifications" element={<AdminCertificationsPage />} />
            <Route path="calendar" element={<AdminCalendarPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            {/* Add more admin routes here as needed */}
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="time-tracking" element={<TimeTrackingPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="overtime" element={<OvertimePage />} />
            <Route path="leave-request" element={<LeaveRequestPage />} />
            <Route path="leave-history" element={<LeaveHistoryPage />} />
            <Route path="leave-balance" element={<LeaveBalancePage />} />
            <Route path="paystubs" element={<PaystubsPage />} />
            <Route path="tax-docs" element={<TaxDocsPage />} />
            <Route path="benefits" element={<BenefitsPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="goals" element={<GoalsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="certifications" element={<EmployeeCertificationsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="handbook" element={<HandbookPage />} />
            <Route path="internal-jobs" element={<InternalJobsPage />} />
            <Route path="career-path" element={<CareerPathPage />} />
            <Route path="mentorship" element={<MentorshipPage />} />
            <Route path="directory" element={<DirectoryPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Add more employee routes here as needed */}
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            {/* Add more manager routes here as needed */}
          </Route>

          {/* HR Routes */}
          <Route path="/hr" element={<HRLayout />}>
            <Route index element={<HRDashboard />} />
            <Route path="employees" element={<HREmployeesPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="directory" element={<HRDirectoryPage />} />
            <Route path="org-chart" element={<OrgChartPage />} />
            <Route path="employee-analytics" element={<EmployeeAnalyticsPage />} />
            <Route path="jobs" element={<HRJobsPage />} />
            <Route path="candidates" element={<HRCandidatesPage />} />
            <Route path="interviews" element={<HRInterviewsPage />} />
            <Route path="pipeline" element={<HRPipelinePage />} />
            <Route path="talent-pool" element={<TalentPoolPage />} />
            <Route path="payroll" element={<HRPayrollPage />} />
            <Route path="salaries" element={<HRSalariesPage />} />
            <Route path="benefits" element={<HRBenefitsPage />} />
            <Route path="time-tracking" element={<HRTimeTrackingPage />} />
            <Route path="attendance" element={<HRAttendancePage />} />
            <Route path="leave" element={<HRLeavePage />} />
            <Route path="overtime" element={<HROvertimePage />} />
            <Route path="schedules" element={<SchedulesPage />} />
            <Route path="performance" element={<HRPerformancePage />} />
            <Route path="departments" element={<HRDepartmentsPage />} />
            <Route path="policies" element={<HRPoliciesPage />} />
            <Route path="teams" element={<HRTeamsPage />} />
            <Route path="locations" element={<HRLocationsPage />} />
            <Route path="hierarchy" element={<HRHierarchyPage />} />
            <Route path="calendar" element={<HRCalendarPage />} />
            <Route path="career-development" element={<HRCareerDevelopmentPage />} />
            <Route path="integrations" element={<HRIntegrationsPage />} />
            <Route path="certifications" element={<HRCertificationsPage />} />
            <Route path="predictive" element={<HRPredictivePage />} />
            <Route path="system-settings" element={<HRSystemSettingsPage />} />
            <Route path="messages" element={<HRMessagesPage />} />
            <Route path="profile" element={<HRProfilePage />} />
            <Route path="mentorship" element={<HRMentorshipPage />} />
            <Route path="settings" element={<HRSettingsPage />} />
            <Route path="learning-analytics" element={<HRLearningAnalyticsPage />} />
            <Route path="skills" element={<HRSkillsPage />} />
            <Route path="user-management" element={<HRUserManagementPage />} />
            <Route path="executive-reports" element={<HRExecutiveReportsPage />} />
            <Route path="workforce-analytics" element={<HRWorkforceAnalyticsPage />} />
            <Route path="reports" element={<HRReportsPage />} />
            <Route path="privacy" element={<HRPrivacyPage />} />
            <Route path="risk" element={<HRRiskPage />} />
            <Route path="legal" element={<HRLegalPage />} />
            <Route path="audit" element={<HRAuditPage />} />
            <Route path="templates" element={<HRTemplatesPage />} />
            <Route path="reporting" element={<HRReportingPage />} />
            <Route path="feedback" element={<HRFeedbackPage />} />
            <Route path="performance-analytics" element={<HRPerformanceAnalyticsPage />} />
            <Route path="compensation-analytics" element={<HRCompensationAnalyticsPage />} />
            <Route path="tax-management" element={<HRTaxManagementPage />} />
            <Route path="positions" element={<HRPositionsPage />} />
            <Route path="contracts" element={<HRContractsPage />} />
            <Route path="handbook" element={<HRHandbookPage />} />
            <Route path="documents" element={<HRDocumentsPage />} />
            <Route path="goals" element={<HRGoalsPage />} />
            <Route path="analytics" element={<HRAnalyticsPage />} />
            <Route path="training" element={<HRTrainingPage />} />
            <Route path="cost-centers" element={<HRCostCentersPage />} />
            <Route path="compliance" element={<HRCompliancePage />} />
            <Route path="data-management" element={<HRDataManagementPage />} />
            <Route path="roles" element={<HRRolesPage />} />
          </Route>

          {/* Auditor Routes */}
          <Route path="/auditor" element={<AuditorLayout />}>
            <Route index element={<AuditorDashboard />} />
            <Route path="compliance" element={<CompliancePage />} />
            <Route path="policy-adherence" element={<PolicyAdherencePage />} />
            <Route path="regulatory-reports" element={<RegulatoryReportsPage />} />
            <Route path="risk-assessment" element={<RiskAssessmentPage />} />
            <Route path="violations" element={<ViolationsPage />} />
            <Route path="activity-logs" element={<ActivityLogsPage />} />
            <Route path="access-logs" element={<AccessLogsPage />} />
            <Route path="change-history" element={<ChangeHistoryPage />} />
            <Route path="security-events" element={<SecurityEventsPage />} />
            <Route path="failed-logins" element={<FailedLoginsPage />} />
            <Route path="payroll-audit" element={<PayrollAuditPage />} />
            <Route path="expense-audit" element={<ExpenseAuditPage />} />
            <Route path="salary-discrepancies" element={<SalaryDiscrepanciesPage />} />
            <Route path="tax-compliance" element={<TaxCompliancePage />} />
            <Route path="budget-analysis" element={<BudgetAnalysisPage />} />
            <Route path="employee-records" element={<EmployeeRecordsPage />} />
            <Route path="document-verification" element={<DocumentVerificationPage />} />
            <Route path="contract-compliance" element={<ContractCompliancePage />} />
            <Route path="leave-attendance" element={<LeaveAttendancePage />} />
            <Route path="performance-records" element={<PerformanceRecordsPage />} />
            <Route path="documents" element={<AuditorDocumentsPage />} />
            <Route path="document-versions" element={<DocumentVersionsPage />} />
            <Route path="access-control" element={<AccessControlPage />} />
            <Route path="document-expiry" element={<DocumentExpiryPage />} />
            <Route path="digital-signatures" element={<DigitalSignaturesPage />} />
            <Route path="audit-reports" element={<AuditReportsPage />} />
            <Route path="compliance-dashboard" element={<ComplianceDashboardPage />} />
            <Route path="trend-analysis" element={<TrendAnalysisPage />} />
            <Route path="custom-reports" element={<CustomReportsPage />} />
            <Route path="executive-summary" element={<ExecutiveSummaryPage />} />
            <Route path="data-privacy" element={<DataPrivacyPage />} />
            <Route path="gdpr" element={<GDPRPage />} />
            <Route path="data-processing" element={<DataProcessingPage />} />
            <Route path="consent-management" element={<ConsentManagementPage />} />
            <Route path="data-breaches" element={<DataBreachesPage />} />
            <Route path="advanced-search" element={<AdvancedSearchPage />} />
            <Route path="investigations" element={<InvestigationsPage />} />
            <Route path="forensic-analysis" element={<ForensicAnalysisPage />} />
            <Route path="evidence" element={<EvidencePage />} />
            <Route path="exports" element={<ExportsPage />} />
            <Route path="profile" element={<AuditorProfilePage />} />
            <Route path="settings" element={<AuditorSettingsPage />} />
            {/* Add more auditor routes here as needed */}
          </Route>

          {/* Trainer Routes */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route index element={<TrainerDashboard />} />
            {/* Add more trainer routes here as needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
