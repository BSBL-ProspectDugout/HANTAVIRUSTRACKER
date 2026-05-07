# Deployment Guide

This guide covers deployment options for the Hantavirus Tracker application.

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [Docker & Docker Compose](#docker--docker-compose)
- [Traditional Server](#traditional-server)
- [Heroku](#heroku)
- [AWS EC2](#aws-ec2)
- [Setting Up Custom Domain](#setting-up-custom-domain)

## Vercel (Recommended)

Vercel is the official Next.js hosting platform and offers the best experience for Next.js applications.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/hantavirus-tracker.git
   git push -u origin main
   ```

2. **Create Vercel Account**
   - Go to https://vercel.com/
   - Sign up with GitHub

3. **Connect Repository**
   - Click "New Project"
   - Select your GitHub repository
   - Configure build settings (should auto-detect Next.js)

4. **Set Environment Variables**
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_key_here
   CDC_API_KEY=your_key_here
   ```

5. **Deploy**
   - Click "Deploy"
   - Your site is now live at `your-project.vercel.app`

6. **Connect Custom Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add your domain (hantavirusnews.com or hantanews.com)
   - Follow DNS configuration instructions

## Docker & Docker Compose

### Using Docker

1. **Build the image**
   ```bash
   docker build -t hantavirus-tracker:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_NEWS_API_KEY=your_key \
     hantavirus-tracker:latest
   ```

3. **Access the app**
   - Open http://localhost:3000

### Using Docker Compose

1. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

2. **Start services**
   ```bash
   docker-compose up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f web
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

## Traditional Server

### On Ubuntu/Debian

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/hantavirus-tracker.git
   cd hantavirus-tracker
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Build the app**
   ```bash
   npm run build
   ```

6. **Set up systemd service**
   ```bash
   sudo nano /etc/systemd/system/hantavirus.service
   ```

   Add:
   ```ini
   [Unit]
   Description=Hantavirus Tracker
   After=network.target

   [Service]
   User=your-user
   WorkingDirectory=/path/to/hantavirus-tracker
   ExecStart=/usr/bin/npm start
   Restart=always
   Environment="NODE_ENV=production"

   [Install]
   WantedBy=multi-user.target
   ```

7. **Start the service**
   ```bash
   sudo systemctl enable hantavirus
   sudo systemctl start hantavirus
   ```

8. **Set up Nginx reverse proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/hantavirus
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name hantavirusnews.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/hantavirus /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Set up SSL with Let's Encrypt**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d hantavirusnews.com
    ```

## Heroku

### Prerequisites
- Heroku account (has a free tier)
- Heroku CLI installed

### Deployment

1. **Create Procfile**
   ```
   web: npm start
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create app**
   ```bash
   heroku create hantavirus-tracker
   ```

4. **Set environment variables**
   ```bash
   heroku config:set NEXT_PUBLIC_NEWS_API_KEY=your_key
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View logs**
   ```bash
   heroku logs --tail
   ```

## AWS EC2

### Prerequisites
- AWS account
- EC2 instance running Ubuntu 20.04 or later

### Steps

1. **Launch EC2 instance**
   - Choose t2.micro (free tier eligible)
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **Follow Traditional Server steps above**

3. **Set up CloudFront (Optional CDN)**
   - Go to CloudFront in AWS console
   - Create distribution pointing to your EC2 IP
   - Use your custom domain

4. **Set up Route53**
   - Register domain or point existing domain
   - Create A record pointing to CloudFront or EC2

## Setting Up Custom Domain

### For hantavirusnews.com or hantanews.com

#### Using Vercel
1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add domain
4. Update DNS records at your registrar

#### Using Namecheap (or similar registrar)
1. Log into your registrar
2. Find DNS settings for your domain
3. Create/update A record:
   - Name: @
   - Value: Your server IP address
   - TTL: 3600

4. Create/update CNAME record for www:
   - Name: www
   - Value: your-domain.com
   - TTL: 3600

### SSL Certificate Setup

For free SSL, use Let's Encrypt:
```bash
sudo certbot certonly --standalone -d hantavirusnews.com -d www.hantavirusnews.com
sudo certbot certonly --standalone -d hantanews.com -d www.hantanews.com
```

## Monitoring & Maintenance

### Health Checks
```bash
# Check if app is running
curl http://localhost:3000/api/outbreaks

# Monitor disk space
df -h

# Check memory usage
free -h
```

### Log Rotation
Set up logrotate to prevent log files from growing too large:
```bash
sudo nano /etc/logrotate.d/hantavirus-tracker
```

### Automated Updates
Set up a cron job to pull latest code:
```bash
0 2 * * * cd /path/to/app && git pull && npm install && npm run build && systemctl restart hantavirus
```

## Performance Optimization

### Enable Compression
In Nginx config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Caching
The API endpoints have built-in caching (revalidate every 1 hour):
- Modify `revalidate` value in API routes to adjust

### Database Connection Pooling
When adding a database, use connection pooling:
```javascript
// Example with Prisma
const prisma = new PrismaClient({
  connection: {
    max: 10,
    min: 5,
  }
});
```

## Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Memory Issues
```bash
# Increase Node.js heap size
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

### Build Failures
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## Support
For deployment issues, check:
- Next.js docs: https://nextjs.org/docs/deployment
- Vercel docs: https://vercel.com/docs
- Nginx docs: https://nginx.org/en/docs/
