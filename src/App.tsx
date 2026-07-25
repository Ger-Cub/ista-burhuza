import React, { useState } from 'react';
import { 
  User, 
  Student, 
  Course, 
  Grade, 
  ScheduleItem, 
  Payment, 
  DeliberationSession, 
  StaffMember, 
  DocumentItem, 
  Announcement, 
  InternalMessage, 
  AcademicEvent 
} from './types';

import { 
  INITIAL_USERS, 
  INITIAL_STUDENTS, 
  INITIAL_COURSES, 
  INITIAL_GRADES, 
  INITIAL_SCHEDULE, 
  INITIAL_PAYMENTS, 
  INITIAL_DELIBERATIONS, 
  INITIAL_STAFF, 
  INITIAL_DOCUMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_MESSAGES, 
  INITIAL_EVENTS 
} from './data/mockData';

import { PublicWebsite } from './components/PublicWebsite';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { UserRoleSelector } from './components/UserRoleSelector';
import { Dashboard } from './components/Dashboard';
import { StudentsModule } from './components/StudentsModule';
import { CoursesModule } from './components/CoursesModule';
import { FinancialModule } from './components/FinancialModule';
import { DeliberationModule } from './components/DeliberationModule';
import { HRModule } from './components/HRModule';
import { DocumentsModule } from './components/DocumentsModule';
import { CommunicationModule } from './components/CommunicationModule';
import { EventsModule } from './components/EventsModule';

export default function App() {
  // Navigation & Authentication State
  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Application Data States
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [grades, setGrades] = useState<Grade[]>(INITIAL_GRADES);
  const [schedules, setSchedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [deliberations, setDeliberations] = useState<DeliberationSession[]>(INITIAL_DELIBERATIONS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [messages, setMessages] = useState<InternalMessage[]>(INITIAL_MESSAGES);
  const [events, setEvents] = useState<AcademicEvent[]>(INITIAL_EVENTS);

  // Handlers
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleAddScheduleItem = (newItem: ScheduleItem) => {
    setSchedules(prev => [...prev, newItem]);
  };

  const handleAddPayment = (newPayment: Payment) => {
    setPayments(prev => [newPayment, ...prev]);

    // Automatically update student paid tuition balance
    setStudents(prev => prev.map(s => {
      if (s.id === newPayment.studentId) {
        return { ...s, fraisPayes: s.fraisPayes + newPayment.montantUSD };
      }
      return s;
    }));
  };

  const handleUpdateGrade = (gradeId: string, newIntra: number, newExamen: number) => {
    setGrades(prev => prev.map(g => {
      if (g.id === gradeId) {
        const noteFinale = newIntra + newExamen;
        return {
          ...g,
          noteIntra: newIntra,
          noteExamen: newExamen,
          noteFinale,
          valide: noteFinale >= 10
        };
      }
      return g;
    }));
  };

  const handleUpdateDeliberationStatus = (sessionId: string, newStatut: DeliberationSession['statut']) => {
    setDeliberations(prev => prev.map(d => {
      if (d.id === sessionId) {
        return { ...d, statut: newStatut };
      }
      return d;
    }));
  };

  const handleAddStaff = (newMember: StaffMember) => {
    setStaff(prev => [newMember, ...prev]);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleAddAnnouncement = (newAnn: Announcement) => {
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const handleSendMessage = (newMsg: InternalMessage) => {
    setMessages(prev => [newMsg, ...prev]);
  };

  const handleAddEvent = (newEvent: AcademicEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const unreadMessagesCount = messages.filter(m => !m.lu && m.destinataireId === currentUser.id).length;

  // Login Request handler
  const handleOpenLogin = () => {
    setShowRoleSelector(true);
  };

  const handleSelectUserRole = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('public');
  };

  return (
    <div id="sigu-app-root" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased">
      {currentView === 'public' ? (
        /* PUBLIC MULTIPAGE UNIVERSITY WEBSITE */
        <PublicWebsite
          students={students}
          courses={courses}
          schedules={schedules}
          grades={grades}
          announcements={announcements}
          onLoginRequest={handleOpenLogin}
          onGoToDashboard={() => {
            if (isLoggedIn) {
              setCurrentView('dashboard');
            } else {
              handleOpenLogin();
            }
          }}
          isLoggedIn={isLoggedIn}
          currentUserRole={currentUser.role.replace('_', ' ')}
        />
      ) : (
        /* PROTECTED DASHBOARD ROUTE (/dashboard) */
        <div className="h-screen max-h-screen flex flex-col bg-slate-100 overflow-hidden">
          {/* Official Protected Header */}
          <Header
            currentUser={currentUser}
            onOpenRoleSelector={() => setShowRoleSelector(true)}
            unreadCount={unreadMessagesCount}
            onGoToPublicSite={() => setCurrentView('public')}
            onLogout={handleLogout}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          />

          {/* Main Content Layout with Fixed Sidebar & Independent Main Scroll */}
          <div className="flex-1 flex flex-col md:flex-row max-w-[1400px] w-full mx-auto p-3 sm:p-5 gap-5 min-h-0 overflow-hidden">
            {/* Navigation Sidebar */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              userRole={currentUser.role}
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

            {/* Independently Scrollable Main Content View */}
            <main id="sigu-main-content" className="flex-1 min-w-0 h-full overflow-y-auto pr-1">
              {activeTab === 'dashboard' && (
                <Dashboard
                  currentUser={currentUser}
                  students={students}
                  courses={courses}
                  payments={payments}
                  deliberations={deliberations}
                  announcements={announcements}
                  events={events}
                  onNavigateTab={(tab: TabType) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'students' && (
                <StudentsModule
                  students={students}
                  courses={courses}
                  grades={grades}
                  payments={payments}
                  onAddStudent={handleAddStudent}
                />
              )}

              {activeTab === 'courses' && (
                <CoursesModule
                  courses={courses}
                  schedules={schedules}
                  staff={staff}
                  onAddCourse={handleAddCourse}
                  onAddScheduleItem={handleAddScheduleItem}
                />
              )}

              {activeTab === 'finances' && (
                <FinancialModule
                  payments={payments}
                  students={students}
                  onAddPayment={handleAddPayment}
                />
              )}

              {activeTab === 'deliberation' && (
                <DeliberationModule
                  currentUser={currentUser}
                  deliberations={deliberations}
                  students={students}
                  courses={courses}
                  grades={grades}
                  onUpdateGrade={handleUpdateGrade}
                  onUpdateDeliberationStatus={handleUpdateDeliberationStatus}
                />
              )}

              {activeTab === 'hr' && (
                <HRModule
                  staff={staff}
                  onAddStaff={handleAddStaff}
                />
              )}

              {activeTab === 'documents' && (
                <DocumentsModule
                  documents={documents}
                  onAddDocument={handleAddDocument}
                />
              )}

              {activeTab === 'communication' && (
                <CommunicationModule
                  currentUser={currentUser}
                  announcements={announcements}
                  messages={messages}
                  onAddAnnouncement={handleAddAnnouncement}
                  onSendMessage={handleSendMessage}
                />
              )}

              {activeTab === 'events' && (
                <EventsModule
                  events={events}
                  onAddEvent={handleAddEvent}
                />
              )}
            </main>
          </div>

          {/* Institutional Fixed Footer */}
          <footer id="sigu-footer" className="bg-emerald-950 text-emerald-100 text-xs py-3 px-6 border-t border-emerald-900 flex-shrink-0 z-20">
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-800 text-white font-bold px-2 py-0.5 text-[10px] uppercase font-heading">
                  Espace Administration
                </span>
                <strong>SIGU ISTA Burhuza v1.0</strong>
                <span className="opacity-40">|</span>
                <span>Campus de Burhuza, Walungu, Sud-Kivu (RDC)</span>
              </div>
              <div className="text-[11px] opacity-80">
                © {new Date().getFullYear()} ISTA Burhuza • Ministère de l'ESU RDC
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Role Selector / Login Modal */}
      <UserRoleSelector
        isOpen={showRoleSelector}
        onClose={() => setShowRoleSelector(false)}
        users={INITIAL_USERS}
        currentUser={currentUser}
        onSelectUser={handleSelectUserRole}
      />
    </div>
  );
}
