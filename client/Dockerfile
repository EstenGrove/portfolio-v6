# --- Build phase ---
  FROM node:23.6.0-alpine AS builder
  WORKDIR /app
  COPY . .
  RUN npm install && npm run build
  
  # --- Serve with nginx ---
  FROM nginx:alpine
  COPY --from=builder /app/dist /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  