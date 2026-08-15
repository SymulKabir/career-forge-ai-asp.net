#### Create persistence volume
```bash
docker volume create mssql-data
```

#### Create SQL Server container

```bash
docker run \
  --platform linux/amd64 \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=SqlServer@123" \
  --name mssql-db \
  -p 1433:1433 \
  -v mssql-data:/var/opt/mssql \
  -d \
  mcr.microsoft.com/mssql/server:2022-latest
  ```

#### Enter to SQL Server

First enter into docker container then run 
```bash
/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P 'SqlServer@123' \
  -C
```
Result:
```
1>
```
Then Test With:
```bash
SELECT @@VERSION;
GO
```