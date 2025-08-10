import React, { useState } from 'react'
import { BookOpen, Search, ChevronRight, ChevronDown, Download, Bookmark, Clock, User } from 'lucide-react'

const HandbookPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started'])
  const [selectedSection, setSelectedSection] = useState<any>(null)

  // Mock handbook data
  const handbookSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      subsections: [
        {
          id: 'welcome',
          title: 'Welcome to the Company',
          content: `Welcome to our organization! We're excited to have you as part of our team. This handbook serves as your comprehensive guide to company policies, procedures, and culture.

Our mission is to create innovative solutions that make a difference in people's lives. As an employee, you're not just doing a job – you're contributing to something meaningful.

Key things to remember as you start:
• Take time to read through this handbook thoroughly
• Don't hesitate to ask questions – everyone is here to help
• Familiarize yourself with our company values and culture
• Connect with your team and colleagues

Your first week will include orientation sessions, team introductions, and getting set up with all necessary tools and access.`,
          lastUpdated: '2024-01-15',
          readTime: '5 min'
        },
        {
          id: 'first-day',
          title: 'Your First Day',
          content: `Your first day checklist and what to expect:

**Before 9:00 AM:**
• Arrive at the office or join the virtual onboarding session
• Check in with Reception or HR
• Collect your employee badge and parking pass (if applicable)

**Morning Activities:**
• Welcome meeting with your manager
• HR orientation session (policies, benefits, systems)
• IT setup (laptop, accounts, access cards)
• Office tour and introductions

**Afternoon Activities:**
• Team introductions and meetings
• Review of role expectations and initial projects
• Set up your workspace
• Complete new hire paperwork

**Week 1 Goals:**
• Complete all onboarding modules
• Meet with key stakeholders
• Set up recurring 1:1s with your manager
• Begin initial project assignments`,
          lastUpdated: '2024-01-10',
          readTime: '3 min'
        },
        {
          id: 'company-overview',
          title: 'Company Overview',
          content: `**Our History**
Founded in 2015, we started as a small team with a big vision. Today, we're a leading technology company serving thousands of customers worldwide.

**Our Mission**
To revolutionize how businesses manage their human resources through innovative, user-friendly technology solutions.

**Our Values**
• **Innovation:** We embrace new ideas and technologies
• **Integrity:** We do the right thing, even when no one is watching
• **Collaboration:** We achieve more together than alone
• **Excellence:** We strive for quality in everything we do
• **Growth:** We invest in our people and their development

**Company Structure**
We operate with a flat organizational structure that encourages open communication and collaboration across all levels.

**Our Products**
We develop comprehensive HR management solutions including:
• Employee management systems
• Payroll and benefits administration
• Performance management tools
• Learning and development platforms`,
          lastUpdated: '2023-12-20',
          readTime: '7 min'
        }
      ]
    },
    {
      id: 'workplace-policies',
      title: 'Workplace Policies',
      icon: '📋',
      subsections: [
        {
          id: 'work-hours',
          title: 'Work Hours & Attendance',
          content: `**Standard Work Hours**
Our standard work week is 40 hours, typically Monday through Friday. Core hours are 10:00 AM to 3:00 PM when all team members should be available.

**Flexible Schedule Options**
• Flexible start times between 7:00 AM - 10:00 AM
• Flexible end times between 3:00 PM - 6:00 PM
• Remote work options available (see Remote Work Policy)

**Attendance Expectations**
• Be punctual for meetings and commitments
• Notify your manager if you'll be late or absent
• Use the time tracking system for accurate records
• Take regular breaks to maintain productivity

**Time Off Requests**
Submit time off requests at least 48 hours in advance through the HR system. Emergency leave can be reported immediately with manager approval.`,
          lastUpdated: '2024-01-08',
          readTime: '4 min'
        },
        {
          id: 'dress-code',
          title: 'Dress Code',
          content: `**General Guidelines**
We maintain a business casual dress code that reflects our professional image while allowing for comfort and personal expression.

**Business Casual Standards**
• Clean, well-fitted clothing
• Collared shirts, blouses, or professional tops
• Dress pants, khakis, or professional skirts/dresses
• Closed-toe shoes (sneakers acceptable if clean and professional)

**What to Avoid**
• Overly casual items (gym wear, flip-flops, shorts)
• Clothing with offensive language or images
• Excessively revealing clothing
• Strong fragrances

**Special Occasions**
• Client meetings: Business professional attire
• Casual Fridays: Jeans and company t-shirts allowed
• Company events: Dress code specified in event details

**Remote Work**
For video calls, maintain professional appearance from the waist up.`,
          lastUpdated: '2023-11-15',
          readTime: '3 min'
        }
      ]
    },
    {
      id: 'benefits',
      title: 'Benefits & Compensation',
      icon: '💰',
      subsections: [
        {
          id: 'health-benefits',
          title: 'Health & Wellness Benefits',
          content: `**Health Insurance**
We offer comprehensive health insurance plans with multiple options to fit your needs:
• Premium PPO Plan (company pays 80% of premium)
• Standard HMO Plan (company pays 75% of premium)
• High-deductible plan with HSA option

**Dental & Vision**
• Dental insurance with preventive care covered 100%
• Vision insurance including annual eye exams and frames

**Wellness Programs**
• On-site fitness center and gym membership reimbursement
• Mental health resources and counseling services
• Annual health screenings and flu shots
• Wellness challenges and incentives

**Additional Benefits**
• Life insurance (2x annual salary, company-paid)
• Disability insurance (short-term and long-term)
• Employee assistance program (EAP)
• Telemedicine services`,
          lastUpdated: '2024-01-01',
          readTime: '6 min'
        },
        {
          id: 'time-off',
          title: 'Time Off & Leave',
          content: `**Vacation Time**
• 15 days for years 1-3
• 20 days for years 4-7
• 25 days for years 8+
• Additional days may be earned through company achievements

**Sick Leave**
• 10 days per year (unused days carry over up to 40 hours)
• Medical appointments encouraged during work hours when needed

**Personal Leave**
• 5 days per year for personal matters
• Religious observances accommodated

**Parental Leave**
• 12 weeks paid maternity/paternity leave
• Additional unpaid leave available under FMLA
• Gradual return-to-work options

**Holidays**
We observe 11 paid holidays annually, plus a floating holiday for personal use.`,
          lastUpdated: '2023-12-01',
          readTime: '5 min'
        }
      ]
    },
    {
      id: 'professional-development',
      title: 'Professional Development',
      icon: '📚',
      subsections: [
        {
          id: 'learning-opportunities',
          title: 'Learning & Growth',
          content: `**Training Programs**
We invest in your professional growth through various learning opportunities:
• Internal training sessions and workshops
• External conference attendance
• Online learning platform subscriptions
• Mentorship programs

**Tuition Reimbursement**
• Up to $5,000 per year for job-related education
• Pre-approval required from manager and HR
• Minimum grade requirements apply
• Commitment agreement for continued employment

**Career Development**
• Annual career development conversations
• Individual development plans (IDPs)
• Internal job posting preferences
• Cross-functional project opportunities

**Performance Reviews**
• Quarterly check-ins with your manager
• Annual comprehensive performance reviews
• 360-degree feedback opportunities
• Goal setting and progress tracking`,
          lastUpdated: '2023-10-15',
          readTime: '4 min'
        }
      ]
    },
    {
      id: 'technology',
      title: 'Technology & Security',
      icon: '🔒',
      subsections: [
        {
          id: 'it-equipment',
          title: 'IT Equipment & Support',
          content: `**Equipment Provided**
• Laptop or desktop computer (Mac or PC based on role)
• Monitor, keyboard, and mouse
• Headset for calls and meetings
• Mobile phone allowance for eligible roles

**Software & Tools**
• Microsoft Office 365 suite
• Collaboration tools (Slack, Teams, Zoom)
• Development tools and licenses as needed
• Cloud storage and backup solutions

**IT Support**
• Help desk available Monday-Friday, 8 AM - 6 PM
• Emergency support for critical issues
• Equipment refresh cycle every 3-4 years
• Remote support for home office setups

**Security Requirements**
• Use company-approved software only
• Keep software updated and patches current
• Use strong passwords and enable 2FA
• Report security incidents immediately`,
          lastUpdated: '2024-01-05',
          readTime: '4 min'
        }
      ]
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSectionClick = (section: any) => {
    setSelectedSection(section)
  }

  const handleDownloadHandbook = () => {
    // Download logic here
    console.log('Downloading complete handbook')
  }

  const filteredSections = handbookSections.map(section => ({
    ...section,
    subsections: section.subsections.filter(subsection =>
      subsection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsection.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.subsections.length > 0 || searchTerm === '')

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Handbook</h1>
            <p className="text-gray-600">Your comprehensive guide to company policies and procedures</p>
          </div>
          <button
            onClick={handleDownloadHandbook}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search handbook content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      {expandedSections.includes(section.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedSections.includes(section.id) && (
                      <div className="ml-8 mt-1 space-y-1">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => handleSectionClick(subsection)}
                            className="block w-full text-left p-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {selectedSection ? (
              /* Section Detail View */
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedSection.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedSection.readTime} read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Last updated: {new Date(selectedSection.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    Bookmark
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  {selectedSection.content.split('\n\n').map((paragraph: string, index: number) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      // Bold headers
                      return (
                        <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                          {paragraph.slice(2, -2)}
                        </h3>
                      )
                    } else if (paragraph.startsWith('• ')) {
                      // Bullet points
                      return (
                        <div key={index} className="ml-4 mb-2">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                            <span className="text-gray-700">{paragraph.slice(2)}</span>
                          </div>
                        </div>
                      )
                    } else {
                      // Regular paragraphs
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      )
                    }
                  })}
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Was this section helpful?</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        👍 Yes
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        👎 No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Overview/Welcome View */
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-8 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-8 h-8" />
                    <h1 className="text-2xl font-bold">Employee Handbook</h1>
                  </div>
                  <p className="text-primary-100 mb-4">
                    Welcome to your comprehensive guide to company policies, procedures, and culture. 
                    This handbook contains everything you need to know about working here.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <div className="font-semibold">📋 Policies</div>
                      <div className="text-primary-100">Complete policy information</div>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <div className="font-semibold">💰 Benefits</div>
                      <div className="text-primary-100">Comprehensive benefits guide</div>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <div className="font-semibold">📚 Development</div>
                      <div className="text-primary-100">Growth and learning opportunities</div>
                    </div>
                  </div>
                </div>

                {/* Section Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {handbookSections.map((section) => (
                    <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{section.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {section.subsections.length} sections covering essential information about {section.title.toLowerCase()}.
                      </p>
                      <div className="space-y-2">
                        {section.subsections.slice(0, 3).map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => handleSectionClick(subsection)}
                            className="block w-full text-left text-sm text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            • {subsection.title}
                          </button>
                        ))}
                        {section.subsections.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{section.subsections.length - 3} more sections
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleSectionClick(handbookSections[0].subsections[0])}
                      className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                    >
                      <div className="font-medium text-gray-900">New Employee Guide</div>
                      <div className="text-sm text-gray-600">Everything you need for your first week</div>
                    </button>
                    <button
                      onClick={() => handleSectionClick(handbookSections[2].subsections[0])}
                      className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                    >
                      <div className="font-medium text-gray-900">Benefits Overview</div>
                      <div className="text-sm text-gray-600">Health, wellness, and compensation</div>
                    </button>
                    <button
                      onClick={() => handleSectionClick(handbookSections[1].subsections[0])}
                      className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                    >
                      <div className="font-medium text-gray-900">Work Policies</div>
                      <div className="text-sm text-gray-600">Hours, attendance, and expectations</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HandbookPage
