#!/usr/bin/env node

/**
 * Security Audit Script for AyurConnect
 * This script checks for common security issues in the application
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const securityChecks = {
  // Check environment variables
  checkEnvironmentVariables: () => {
    const requiredVars = [
      'JWT_SECRET_KEY',
      'JWT_REFRESH_SECRET',
      'MONGODB_URI',
      'EMAIL_USER',
      'EMAIL_PASS'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing);
      return false;
    }

    // Check JWT secret strength
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (jwtSecret && jwtSecret.length < 32) {
      console.warn('⚠️ JWT_SECRET_KEY should be at least 32 characters long');
    }

    console.log('✅ Environment variables check passed');
    return true;
  },

  // Check package.json for known vulnerabilities
  checkDependencies: () => {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      const knownVulnerablePackages = [
        'express-session@1.17.0',
        'lodash@4.17.0',
        'moment@2.29.0'
      ];

      const vulnerabilities = [];
      for (const [pkg, version] of Object.entries(dependencies)) {
        if (knownVulnerablePackages.includes(`${pkg}@${version}`)) {
          vulnerabilities.push(`${pkg}@${version}`);
        }
      }

      if (vulnerabilities.length > 0) {
        console.warn('⚠️ Potentially vulnerable packages detected:', vulnerabilities);
        return false;
      }

      console.log('✅ Dependencies check passed');
      return true;
    } catch (error) {
      console.error('❌ Error checking dependencies:', error.message);
      return false;
    }
  },

  // Check for hardcoded secrets
  checkHardcodedSecrets: () => {
    const sensitivePatterns = [
      /password\s*[:=]\s*['"][^'"]+['"]/gi,
      /secret\s*[:=]\s*['"][^'"]+['"]/gi,
      /key\s*[:=]\s*['"][^'"]+['"]/gi,
      /token\s*[:=]\s*['"][^'"]+['"]/gi,
      /api_key\s*[:=]\s*['"][^'"]+['"]/gi,
      /private_key\s*[:=]\s*['"][^'"]+['"]/gi
    ];

    const filesToCheck = [
      '../controllers/userController.js',
      '../middleware/isAuthenticated.js',
      '../config/database.js',
      '../config/emailConfig.js',
      '../index.js'
    ];

    let foundSecrets = false;

    for (const file of filesToCheck) {
      try {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          for (const pattern of sensitivePatterns) {
            const matches = content.match(pattern);
            if (matches) {
              console.warn(`⚠️ Potential hardcoded secret found in ${file}:`, matches[0]);
              foundSecrets = true;
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error checking file ${file}:`, error.message);
      }
    }

    if (!foundSecrets) {
      console.log('✅ No hardcoded secrets found');
      return true;
    }
    return false;
  },

  // Check CORS configuration
  checkCORS: () => {
    try {
      const indexFile = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
      
      if (indexFile.includes('cors()') && !indexFile.includes('corsOptions')) {
        console.warn('⚠️ CORS is enabled without specific configuration - this might be too permissive');
        return false;
      }

      console.log('✅ CORS configuration check passed');
      return true;
    } catch (error) {
      console.error('❌ Error checking CORS configuration:', error.message);
      return false;
    }
  },

  // Check for proper error handling
  checkErrorHandling: () => {
    try {
      const indexFile = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
      
      if (!indexFile.includes('app.use((err, req, res, next)')) {
        console.warn('⚠️ Global error handler not found');
        return false;
      }

      console.log('✅ Error handling check passed');
      return true;
    } catch (error) {
      console.error('❌ Error checking error handling:', error.message);
      return false;
    }
  },

  // Check for security headers
  checkSecurityHeaders: () => {
    try {
      const indexFile = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
      
      const securityHeaders = [
        'helmet',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'X-XSS-Protection'
      ];

      const missingHeaders = securityHeaders.filter(header => !indexFile.includes(header));
      
      if (missingHeaders.length > 0) {
        console.warn('⚠️ Missing security headers:', missingHeaders);
        return false;
      }

      console.log('✅ Security headers check passed');
      return true;
    } catch (error) {
      console.error('❌ Error checking security headers:', error.message);
      return false;
    }
  },

  // Check for rate limiting
  checkRateLimiting: () => {
    try {
      const indexFile = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
      
      if (!indexFile.includes('rateLimit') && !indexFile.includes('express-rate-limit')) {
        console.warn('⚠️ Rate limiting not configured');
        return false;
      }

      console.log('✅ Rate limiting check passed');
      return true;
    } catch (error) {
      console.error('❌ Error checking rate limiting:', error.message);
      return false;
    }
  }
};

// Run all security checks
const runSecurityAudit = () => {
  console.log('🔒 Starting Security Audit for AyurConnect...\n');

  const results = {};
  let passedChecks = 0;
  const totalChecks = Object.keys(securityChecks).length;

  for (const [checkName, checkFunction] of Object.entries(securityChecks)) {
    console.log(`\n📋 Running ${checkName}...`);
    try {
      results[checkName] = checkFunction();
      if (results[checkName]) {
        passedChecks++;
      }
    } catch (error) {
      console.error(`❌ Error in ${checkName}:`, error.message);
      results[checkName] = false;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('🔒 SECURITY AUDIT SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passedChecks}/${totalChecks}`);
  console.log(`❌ Failed: ${totalChecks - passedChecks}/${totalChecks}`);
  
  if (passedChecks === totalChecks) {
    console.log('\n🎉 All security checks passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️ Some security issues were found. Please review and fix them.');
    process.exit(1);
  }
};

// Run the audit if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSecurityAudit();
}

export default runSecurityAudit; 