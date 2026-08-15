#### Login Into Database

```bash
# Inside Docker Container
/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P 'SqlServer@123' \
  -C
```

#### Create Database
```bash
CREATE DATABASE CareerForgeDb;
GO
```
Then Check:
```bash
SELECT name FROM sys.databases;
GO
```
Then Exist:
```bash
EXIT
```
