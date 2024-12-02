@echo off
echo Creating SWAMS Project Structure...

REM Create root project directory
mkdir SWAMS
cd SWAMS

REM Create Presentation Layer directories
echo Creating Presentation Layer...
mkdir client-applications
cd client-applications
mkdir nextjs-frontend
mkdir mobile-app
cd nextjs-frontend
mkdir components
mkdir pages
mkdir public
mkdir styles
cd ..
cd mobile-app
mkdir android
mkdir ios
mkdir shared
cd ..
cd ..

REM Create Frontend Services directories
mkdir frontend-services
cd frontend-services
mkdir i18n-service
mkdir ui-components
mkdir map-renderer
cd ..

REM Create Business Logic Layer directories
echo Creating Business Logic Layer...
mkdir api-gateway
cd api-gateway
mkdir nginx-config
mkdir jwt-auth
cd ..

REM Create Core Services directories
mkdir core-services
cd core-services
mkdir user-service
mkdir water-management
mkdir analytics-engine
mkdir task-manager
mkdir notification-hub
cd ..

REM Create Message Queue directory
mkdir message-queue
cd message-queue
mkdir rabbitmq-config
cd ..

REM Create Data Layer directories
echo Creating Data Layer...
mkdir databases
cd databases

REM MongoDB Collections
mkdir mongodb-cluster
cd mongodb-cluster

REM User Management DB
mkdir user-management-db
cd user-management-db
type nul > users.schema.json
type nul > roles.schema.json
type nul > permissions.schema.json
type nul > access-logs.schema.json
cd ..

REM Task Management DB
mkdir task-management-db
cd task-management-db
type nul > tasks.schema.json
type nul > maintenance-logs.schema.json
type nul > work-orders.schema.json
type nul > assignments.schema.json
cd ..

REM Notification DB
mkdir notification-db
cd notification-db
type nul > notifications.schema.json
type nul > message-templates.schema.json
type nul > delivery-logs.schema.json
type nul > user-preferences.schema.json
cd ..

REM Analytics DB
mkdir analytics-db
cd analytics-db
type nul > reports.schema.json
type nul > dashboard-configs.schema.json
type nul > ml-models.schema.json
type nul > performance-metrics.schema.json
cd ..
cd ..

REM TimescaleDB
mkdir timescaledb
cd timescaledb

REM Water Consumption Data
mkdir water-consumption-data
cd water-consumption-data
type nul > meter-readings.schema.sql
type nul > sensor-data.schema.sql
type nul > anomaly-records.schema.sql
cd ..

REM Historical Data
mkdir historical-data
cd historical-data
type nul > hourly-aggregates.schema.sql
type nul > daily-aggregates.schema.sql
type nul > monthly-aggregates.schema.sql
cd ..
cd ..
cd ..

REM Create Storage Services directories
mkdir storage-services
cd storage-services

REM Object Storage
mkdir object-storage
cd object-storage
mkdir media-storage
cd media-storage
mkdir images
mkdir documents
mkdir backups
cd ..
cd ..

REM CDN and Cache
mkdir cdn-cache
mkdir cache-layer
cd cache-layer
mkdir redis-config
cd ..
cd ..

REM Create External Integration directories
echo Creating External Integration Layer...
mkdir external-integrations
cd external-integrations
mkdir external-apis
mkdir iot-gateway
cd ..

REM Create External Service Layer directories
mkdir external-services
cd external-services
mkdir dashboard-interface
mkdir gis-interface
mkdir local-gis-service
mkdir google-maps-integration
cd ..

REM Create Documentation directory
mkdir docs
cd docs
mkdir api-docs
mkdir user-guides
mkdir training-materials
type nul > README.md
cd ..

REM Create Docker configuration files
type nul > docker-compose.yml
type nul > .dockerignore

REM Create configuration files
type nul > .env.example
type nul > .gitignore

REM Create README file with project overview
echo # SWAMS - Smart Water Management System > README.md
echo. >> README.md
echo ## Project Overview >> README.md
echo SWAMS is a comprehensive water management system designed for campus-wide monitoring and control. >> README.md

echo Project structure created successfully!
pause