// Main application script for OrganEase

// Sample organ data (in real app, this would come from API)
const organs = [
    {
        id: 1,
        organ: "Heart",
        bloodGroup: "A+",
        age: 32,
        center: "City General Hospital",
        contact: "cardio@citygeneral.org",
        status: "available",
        urgency: "critical",
        preservationTime: "4 hours remaining",
        compatibility: ["A+", "AB+"],
        location: "New York",
        listedAt: "2023-10-15 14:30"
    },
    {
        id: 2,
        organ: "Kidney",
        bloodGroup: "O-",
        age: 45,
        center: "National Transplant Center",
        contact: "nephro@nationaltransplant.gov",
        status: "available",
        urgency: "urgent",
        preservationTime: "18 hours remaining",
        compatibility: ["O-", "O+"],
        location: "Chicago",
        listedAt: "2023-10-15 10:15"
    },
    {
        id: 3,
        organ: "Liver",
        bloodGroup: "B+",
        age: 28,
        center: "Metro Medical Center",
        contact: "hepatology@metromedical.com",
        status: "available",
        urgency: "standard",
        preservationTime: "12 hours remaining",
        compatibility: ["B+", "AB+"],
        location: "Los Angeles",
        listedAt: "2023-10-14 22:45"
    },
    {
        id: 4,
        organ: "Lungs",
        bloodGroup: "AB+",
        age: 50,
        center: "City General Hospital",
        contact: "pulmo@citygeneral.org",
        status: "available",
        urgency: "critical",
        preservationTime: "6 hours remaining",
        compatibility: ["AB+", "A+", "B+"],
        location: "New York",
        listedAt: "2023-10-15 08:20"
    },
    {
        id: 5,
        organ: "Cornea",
        bloodGroup: "A-",
        age: 60,
        center: "Vision Care Institute",
        contact: "ophthalmology@visioncare.org",
        status: "available",
        urgency: "standard",
        preservationTime: "72 hours remaining",
        compatibility: ["A-", "A+", "AB-", "AB+"],
        location: "Miami",
        listedAt: "2023-10-13 16:10"
    },
    {
        id: 6,
        organ: "Pancreas",
        bloodGroup: "O+",
        age: 35,
        center: "National Transplant Center",
        contact: "endocrino@nationaltransplant.gov",
        status: "available",
        urgency: "urgent",
        preservationTime: "24 hours remaining",
        compatibility: ["O+", "O-"],
        location: "Chicago",
        listedAt: "2023-10-15 12:00"
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'dashboard.html' || currentPage === '') {
        initializeDashboard();
    }
    
    if (currentPage === 'request.html') {
        initializeRequestForm();
    }
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomepage();
    }
});

// Dashboard functionality
function initializeDashboard() {
    displayOrgans();
    setupFilters();
    updateStats();
    
    // Search functionality
    const searchBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterOrgans);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

function displayOrgans(filteredOrgans = organs) {
    const organsGrid = document.getElementById('organsGrid');
    
    if (!organsGrid) return;
    
    if (filteredOrgans.length === 0) {
        organsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No organs found</h3>
                <p>Try adjusting your filters or check back later.</p>
            </div>
        `;
        return;
    }
    
    organsGrid.innerHTML = filteredOrgans.map(organ => `
        <div class="organ-card">
            <div class="organ-header">
                <div class="organ-type">${organ.organ}</div>
                <div class="organ-status ${organ.urgency}">
                    ${organ.urgency === 'critical' ? 'CRITICAL' : organ.urgency.toUpperCase()}
                </div>
            </div>
            <div class="organ-details">
                <div class="detail-row">
                    <span class="detail-label">Blood Group</span>
                    <span class="detail-value blood-group">${organ.bloodGroup}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Donor Age</span>
                    <span class="detail-value">${organ.age} years</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Procurement Center</span>
                    <span class="detail-value">${organ.center}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${organ.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Preservation Time</span>
                    <span class="detail-value">${organ.preservationTime}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Compatible With</span>
                    <span class="detail-value">${organ.compatibility.join(', ')}</span>
                </div>
            </div>
            <div class="organ-actions">
                <div>
                    ${organ.urgency === 'critical' ? 
                        '<span class="urgent-badge"><i class="fas fa-bolt"></i> URGENT TRANSPORT NEEDED</span>' : 
                        '<span style="color: #666;"><i class="fas fa-clock"></i> Listed: ' + organ.listedAt + '</span>'
                    }
                </div>
                <a href="request.html?organ=${organ.id}" class="btn btn-primary">
                    <i class="fas fa-plus-circle"></i> Request
                </a>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const organTypeFilter = document.getElementById('organType');
    const bloodGroupFilter = document.getElementById('bloodGroup');
    const centerFilter = document.getElementById('center');
    
    // Populate filters with unique values
    if (organTypeFilter) {
        const organTypes = [...new Set(organs.map(organ => organ.organ.toLowerCase()))];
        // Options are already set in HTML
    }
    
    if (bloodGroupFilter) {
        const bloodGroups = [...new Set(organs.map(organ => organ.bloodGroup))];
        // Options are already set in HTML
    }
}

function filterOrgans() {
    const organType = document.getElementById('organType').value.toLowerCase();
    const bloodGroup = document.getElementById('bloodGroup').value;
    const center = document.getElementById('center').value;
    
    let filtered = organs;
    
    if (organType) {
        filtered = filtered.filter(organ => organ.organ.toLowerCase() === organType);
    }
    
    if (bloodGroup) {
        filtered = filtered.filter(organ => organ.bloodGroup === bloodGroup);
    }
    
    if (center) {
        filtered = filtered.filter(organ => organ.center.toLowerCase().includes(center.toLowerCase()));
    }
    
    displayOrgans(filtered);
    updateStats(filtered);
}

function resetFilters() {
    document.getElementById('organType').value = '';
    document.getElementById('bloodGroup').value = '';
    document.getElementById('center').value = '';
    
    displayOrgans(organs);
    updateStats(organs);
}

function updateStats(filteredOrgans = organs) {
    const totalOrgans = document.getElementById('totalOrgans');
    const urgentOrgans = document.getElementById('urgentOrgans');
    const centersCount = document.getElementById('centersCount');
    const matchedToday = document.getElementById('matchedToday');
    
    if (totalOrgans) totalOrgans.textContent = filteredOrgans.length;
    
    if (urgentOrgans) {
        const urgent = filteredOrgans.filter(organ => organ.urgency === 'critical' || organ.urgency === 'urgent');
        urgentOrgans.textContent = urgent.length;
    }
    
    if (centersCount) {
        const centers = [...new Set(filteredOrgans.map(organ => organ.center))];
        centersCount.textContent = centers.length;
    }
    
    if (matchedToday) {
        // Simulate matches today
        matchedToday.textContent = Math.floor(Math.random() * 5) + 1;
    }
}

// Request Form functionality
function initializeRequestForm() {
    setupFormTabs();
    setupFormNavigation();
    setupFormSubmission();
    populateFormFromURL();
}

function setupFormTabs() {
    const tabs = document.querySelectorAll('.tab');
    const formSections = document.querySelectorAll('.form-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding section
            formSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${tabName}-section`) {
                    section.classList.add('active');
                }
            });
            
            // Update preview if on payment section
            if (tabName === 'payment') {
                updateRequestPreview();
            }
        });
    });
}

function setupFormNavigation() {
    // Next buttons
    document.querySelectorAll('.next-tab').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const nextTab = button.dataset.next;
            
            if (validateCurrentSection()) {
                document.querySelector(`.tab[data-tab="${nextTab}"]`).click();
            }
        });
    });
    
    // Previous buttons
    document.querySelectorAll('.prev-tab').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const prevTab = button.dataset.prev;
            document.querySelector(`.tab[data-tab="${prevTab}"]`).click();
        });
    });
}

function validateCurrentSection() {
    const activeSection = document.querySelector('.form-section.active');
    const requiredInputs = activeSection.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e53935';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
    }
    
    return isValid;
}

function updateRequestPreview() {
    document.getElementById('previewPatientName').textContent = 
        document.getElementById('patientName').value || '-';
    
    document.getElementById('previewOrganType').textContent = 
        document.getElementById('organType').value || '-';
    
    document.getElementById('previewBloodGroup').textContent = 
        document.getElementById('patientBloodGroup').value || '-';
    
    const urgency = document.getElementById('urgencyLevel').value;
    document.getElementById('previewUrgency').textContent = urgency || '-';
    
    const urgencyBadge = document.getElementById('urgencyBadge');
    if (urgency === 'critical' || urgency === 'urgent') {
        urgencyBadge.style.display = 'inline-flex';
        urgencyBadge.innerHTML = urgency === 'critical' ? 
            '<i class="fas fa-bolt"></i> CRITICAL' : 
            '<i class="fas fa-clock"></i> URGENT';
    } else {
        urgencyBadge.style.display = 'none';
    }
}

function setupFormSubmission() {
    const form = document.getElementById('organRequestForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCurrentSection()) {
                // Generate reference ID
                const referenceId = 'ORG-' + new Date().getFullYear() + '-' + 
                    Math.floor(100000 + Math.random() * 900000);
                document.getElementById('referenceId').textContent = referenceId;
                
                // Show confirmation
                document.querySelectorAll('.form-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById('confirmation-section').style.display = 'block';
                
                // In real app, submit data to server
                console.log('Form submitted:', {
                    patient: document.getElementById('patientName').value,
                    organ: document.getElementById('organType').value,
                    bloodGroup: document.getElementById('patientBloodGroup').value,
                    urgency: document.getElementById('urgencyLevel').value,
                    hospital: document.getElementById('hospitalName').value,
                    referenceId: referenceId
                });
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

function populateFormFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const organId = urlParams.get('organ');
    
    if (organId && organs[organId - 1]) {
        const organ = organs[organId - 1];
        document.getElementById('organType').value = organ.organ.toLowerCase();
        document.getElementById('urgencyLevel').value = organ.urgency;
        
        // Update preview if on payment tab
        if (document.querySelector('.tab.active').dataset.tab === 'payment') {
            updateRequestPreview();
        }
    }
}

// Homepage functionality
function initializeHomepage() {
    // Add any homepage-specific functionality here
    console.log('OrganEase homepage loaded');
}

// Utility function for generating sample data
function generateSampleOrgans(count) {
    const organTypes = ['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas', 'Cornea', 'Intestine'];
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const centers = [
        'City General Hospital',
        'National Transplant Center',
        'Metro Medical Center',
        'University Medical Center',
        'Regional Health Institute'
    ];
    const locations = ['New York', 'Chicago', 'Los Angeles', 'Houston', 'Miami'];
    
    const sampleOrgans = [];
    
    for (let i = 0; i < count; i++) {
        sampleOrgans.push({
            id: i + 1,
            organ: organTypes[Math.floor(Math.random() * organTypes.length)],
            bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
            age: Math.floor(Math.random() * 50) + 18,
            center: centers[Math.floor(Math.random() * centers.length)],
            contact: `contact${i}@hospital.org`,
            status: 'available',
            urgency: ['critical', 'urgent', 'standard'][Math.floor(Math.random() * 3)],
            preservationTime: `${Math.floor(Math.random() * 72)} hours remaining`,
            compatibility: [bloodGroups[Math.floor(Math.random() * bloodGroups.length)]],
            location: locations[Math.floor(Math.random() * locations.length)],
            listedAt: new Date(Date.now() - Math.random() * 86400000).toISOString().replace('T', ' ').substring(0, 16)
        });
    }
    
    return sampleOrgans;
}



// Add to the end of your existing script.js file

// Blood Camp functions
function initBloodCampPage() {
    // Initialize map if on blood camp page
    if (document.getElementById('bloodCampMap')) {
        // Map initialization code from blood-camp.html
        console.log('Blood camp page initialized');
    }
}

// Requested Organs functions
function initRequestedOrgansPage() {
    // Initialize requested organs page
    if (document.getElementById('requestsTable')) {
        console.log('Requested organs page initialized');
    }
}

// Update the main initialization function
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'dashboard.html' || currentPage === '') {
        initializeDashboard();
    }
    
    if (currentPage === 'request.html') {
        initializeRequestForm();
    }
    
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomepage();
    }
    
    if (currentPage === 'blood-camp.html') {
        initBloodCampPage();
    }
    
    if (currentPage === 'requested-organs.html') {
        initRequestedOrgansPage();
    }
});