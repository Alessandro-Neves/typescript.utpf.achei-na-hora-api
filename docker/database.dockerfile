FROM mysql:8.0
ADD ./create-databases.sql /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
ENV PORT=3306
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_ROOT_PASSWORD=admin123
EXPOSE $PORT