import React, { useState, useEffect } from 'react';
import { Card, Spin, Alert, Typography } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Title, Paragraph } = Typography;

/*
https://api.yuntooai.com/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList 接口返回的内容如下：
{
    "success": true,
    "msg": "",
    "errorMsg": "",
    "errorCode": "0000",
    "params": null,
    "data": {
        "tableData": [
            {
                "customer_type": "企业",
                "gmt_create": 1754992291000,
                "address": "777",
                "contact_id_label": [
                    {
                        "label": "唐总",
                        "value": 6
                    }
                ],
                "level_id": 2,
                "remark": null,
                "source": "电话销售",
                "contact_id": 6,
                "gmt_modified": 1754992677000,
                "level_id_label": [
                    {
                        "label": "中级客户",
                        "value": 2
                    }
                ],
                "status_label": [
                    {
                        "label": "活跃",
                        "value": 1,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "电话销售",
                        "value": "电话销售",
                        "children": null
                    }
                ],
                "employee_id": 36,
                "employee_id_label": [
                    {
                        "label": "张三23",
                        "value": 36
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "企业",
                        "value": "企业",
                        "children": null
                    }
                ],
                "customer_name": "李四",
                "id": 12,
                "customer_id": 12,
                "status": 1
            },
            {
                "customer_type": "企业",
                "gmt_create": 1754725544000,
                "address": "杭州市余杭区凤新路501号",
                "contact_id_label": [
                    {
                        "label": "唐总",
                        "value": 6
                    }
                ],
                "level_id": 7,
                "remark": "测试",
                "source": "他人介绍",
                "contact_id": 6,
                "gmt_modified": 1755013871000,
                "level_id_label": [
                    {
                        "label": "新客户",
                        "value": 7
                    }
                ],
                "status_label": [
                    {
                        "label": "正常",
                        "value": 2,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "他人介绍",
                        "value": "他人介绍",
                        "children": null
                    }
                ],
                "employee_id": 27,
                "employee_id_label": [
                    {
                        "label": "张三",
                        "value": 27
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "企业",
                        "value": "企业",
                        "children": null
                    }
                ],
                "customer_name": "浙江菜鸟网络有限公司",
                "id": 11,
                "customer_id": 11,
                "status": 2
            },
            {
                "customer_type": "个人",
                "gmt_create": 999083821000,
                "address": "612 East Alley",
                "contact_id_label": [
                    {
                        "label": "唐总",
                        "value": 6
                    }
                ],
                "level_id": 4,
                "remark": "A query is used to extract data from the database in a readable format according to the user's request. The past has no power over the present moment. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. Actually it is just in an idea when feel oneself can achieve and cannot achieve. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. You cannot save people, you can just love them. You cannot save people, you can just love them. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. Creativity is intelligence having fun. All journeys have secret destinations of which the traveler is unaware. If you wait, all that happens is you get older. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. All journeys have secret destinations of which the traveler is unaware. The Synchronize to Database function will give you a full picture of all database differences. If the plan doesn’t work, change the plan, but never the goal. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. Sometimes you win, sometimes you learn. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling), over an insecure network. There is no way to happiness. Happiness is the way. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. The first step is as good as half over. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. If it scares you, it might be a good thing to try. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Flexible settings enable you to set up a custom key for comparison and synchronization. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. What you get by achieving your goals is not as important as what you become by achieving your goals. I destroy my enemies when I make them my friends. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up menus quickly and easily. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Difficult circumstances serve as a textbook of life for people. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. You must be the change you wish to see in the world. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. It wasn’t raining when Noah built the ark. Navicat 15 has added support for the system-wide dark mode. The Synchronize to Database function will give you a full picture of all database differences. A comfort zone is a beautiful place, but nothing ever grows there. All journeys have secret destinations of which the traveler is unaware. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. All journeys have secret destinations of which the traveler is unaware. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. How we spend our days is, of course, how we spend our lives. Champions keep playing until they get it right. Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from. All journeys have secret destinations of which the traveler is unaware. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. What you get by achieving your goals is not as important as what you become by achieving your goals. The Synchronize to Database function will give you a full picture of all database differences. I will greet this day with love in my heart. Anyone who has ever made anything of importance was disciplined. Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring effective as possible. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. If it scares you, it might be a good thing to try. The Main Window consists of several toolbars and panes for you to work on connections, database objects and advanced tools. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. Navicat 15 has added support for the system-wide dark mode. Actually it is just in an idea when feel oneself can achieve and cannot achieve. How we spend our days is, of course, how we spend our lives. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. If it scares you, it might be a good thing to try. Remember that failure is an event, not a person. The Synchronize to Database function will give you a full picture of all database differences. What you get by achieving your goals is not as important as what you become by achieving your goals. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. A man is not old until regrets take the place of dreams. The past has no power over the present moment. Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from.",
                "source": "他人介绍",
                "contact_id": 6,
                "gmt_modified": 1754566610000,
                "level_id_label": [
                    {
                        "label": "高级客户",
                        "value": 4
                    }
                ],
                "status_label": [
                    {
                        "label": "活跃",
                        "value": 1,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "他人介绍",
                        "value": "他人介绍",
                        "children": null
                    }
                ],
                "employee_id": 31,
                "employee_id_label": [
                    {
                        "label": "赵六",
                        "value": 31
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "个人",
                        "value": "个人",
                        "children": null
                    }
                ],
                "customer_name": "杭州云图科技有限公司",
                "id": 6,
                "customer_id": 6,
                "status": 1
            },
            {
                "customer_type": "企业",
                "gmt_create": 1153400663000,
                "address": "643 Earle Rd",
                "contact_id_label": [
                    {
                        "label": "钱主任",
                        "value": 4
                    }
                ],
                "level_id": 4,
                "remark": "The Synchronize to Database function will give you a full picture of all database differences. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. A query is used to extract data from the database in a readable format according to the user's request. Genius is an infinite capacity for taking pains.",
                "source": "网上销售",
                "contact_id": 4,
                "gmt_modified": 1754566608000,
                "level_id_label": [
                    {
                        "label": "高级客户",
                        "value": 4
                    }
                ],
                "status_label": [
                    {
                        "label": "活跃",
                        "value": 1,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "网上销售",
                        "value": "网上销售",
                        "children": null
                    }
                ],
                "employee_id": 30,
                "employee_id_label": [
                    {
                        "label": "Liao Anqi",
                        "value": 30
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "企业",
                        "value": "企业",
                        "children": null
                    }
                ],
                "customer_name": "云云科技公司",
                "id": 4,
                "customer_id": 4,
                "status": 1
            },
            {
                "customer_type": "个人",
                "gmt_create": 1512315014000,
                "address": "641 Whitehouse Lane, Huntingdon Rd",
                "contact_id_label": [
                    {
                        "label": "赵部长",
                        "value": 3
                    }
                ],
                "level_id": 2,
                "remark": "After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up menus quickly and easily. The reason why a great man is great is that he resolves to be a great man. Champions keep playing until they get it right. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. I destroy my enemies when I make them my friends. The On Startup feature allows you to control what tabs appear when you launch Navicat. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Genius is an infinite capacity for taking pains. Optimism is the one quality more associated with success and happiness than any other. Creativity is intelligence having fun. The reason why a great man is great is that he resolves to be a great man. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. Anyone who has never made a mistake has never tried anything new. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. You must be the change you wish to see in the world. The On Startup feature allows you to control what tabs appear when you launch Navicat.",
                "source": "展会",
                "contact_id": 3,
                "gmt_modified": 1754566605000,
                "level_id_label": [
                    {
                        "label": "中级客户",
                        "value": 2
                    }
                ],
                "status_label": [
                    {
                        "label": "正常",
                        "value": 2,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "展会",
                        "value": "展会",
                        "children": null
                    }
                ],
                "employee_id": 29,
                "employee_id_label": [
                    {
                        "label": "王五",
                        "value": 29
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "个人",
                        "value": "个人",
                        "children": null
                    }
                ],
                "customer_name": "兔兔科技股份有限公司",
                "id": 3,
                "customer_id": 3,
                "status": 2
            },
            {
                "customer_type": "企业",
                "gmt_create": 1376950921000,
                "address": "837 Silver St, Newnham",
                "contact_id_label": [
                    {
                        "label": "张经理",
                        "value": 2
                    }
                ],
                "level_id": 2,
                "remark": "Genius is an infinite capacity for taking pains. The Synchronize to Database function will give you a full picture of all database differences. In the middle of winter I at last discovered that there was in me an invincible summer. You will succeed because most people are lazy. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Champions keep playing until they get it right. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. You must be the change you wish to see in the world. Difficult circumstances serve as a textbook of life for people. Actually it is just in an idea when feel oneself can achieve and cannot achieve. Difficult circumstances serve as a textbook of life for people. SSH serves to prevent such vulnerabilities and allows you to access a remote server's shell without compromising security. Navicat authorizes you to make connection to remote servers running on different platforms (i.e. Windows, macOS, Linux and UNIX), and supports PAM and GSSAPI authentication. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. A man’s best friends are his ten fingers. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Optimism is the one quality more associated with success and happiness than any other. I destroy my enemies when I make them my friends. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. How we spend our days is, of course, how we spend our lives. Anyone who has ever made anything of importance was disciplined. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring effective as possible. Anyone who has ever made anything of importance was disciplined. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. You must be the change you wish to see in the world. Creativity is intelligence having fun. A man’s best friends are his ten fingers. If the plan doesn’t work, change the plan, but never the goal. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. The On Startup feature allows you to control what tabs appear when you launch Navicat. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Optimism is the one quality more associated with success and happiness than any other. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. The Main Window consists of several toolbars and panes for you to work on connections, database objects and advanced tools. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. The reason why a great man is great is that he resolves to be a great man. Anyone who has ever made anything of importance was disciplined. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. Remember that failure is an event, not a person. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. If you wait, all that happens is you get older. You cannot save people, you can just love them. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy.",
                "source": "官网",
                "contact_id": 2,
                "gmt_modified": 1754566595000,
                "level_id_label": [
                    {
                        "label": "中级客户",
                        "value": 2
                    }
                ],
                "status_label": [
                    {
                        "label": "流失",
                        "value": 0,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "官网",
                        "value": "官网",
                        "children": null
                    }
                ],
                "employee_id": 28,
                "employee_id_label": [
                    {
                        "label": "李四",
                        "value": 28
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "企业",
                        "value": "企业",
                        "children": null
                    }
                ],
                "customer_name": "云图科技有限公司",
                "id": 2,
                "customer_id": 2,
                "status": 0
            },
            {
                "customer_type": "企业",
                "gmt_create": 1378161220000,
                "address": "3-15-1 Ginza, Chuo-ku",
                "contact_id_label": [
                    {
                        "label": "王经理",
                        "value": 1
                    }
                ],
                "level_id": 1,
                "remark": "If it scares you, it might be a good thing to try. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. Typically, it is employed as an encrypted version of Telnet. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. The Synchronize to Database function will give you a full picture of all database differences. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. A query is used to extract data from the database in a readable format according to the user's request. A man is not old until regrets take the place of dreams. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. Sometimes you win, sometimes you learn. A comfort zone is a beautiful place, but nothing ever grows there. A query is used to extract data from the database in a readable format according to the user's request. I may not have gone where I intended to go, but I think I have ended up where I needed to be. It wasn’t raining when Noah built the ark. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. A man is not old until regrets take the place of dreams. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. Success consists of going from failure to failure without loss of enthusiasm. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Anyone who has never made a mistake has never tried anything new. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Typically, it is employed as an encrypted version of Telnet. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. Typically, it is employed as an encrypted version of Telnet. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. To connect to a database or schema, simply double-click it in the pane. It wasn’t raining when Noah built the ark. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. A comfort zone is a beautiful place, but nothing ever grows there. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. If opportunity doesn’t knock, build a door. You will succeed because most people are lazy. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. If the plan doesn’t work, change the plan, but never the goal. All journeys have secret destinations of which the traveler is unaware. I may not have gone where I intended to go, but I think I have ended up where I needed to be. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. Remember that failure is an event, not a person. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. The On Startup feature allows you to control what tabs appear when you launch Navicat. A comfort zone is a beautiful place, but nothing ever grows there. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. Difficult circumstances serve as a textbook of life for people. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view.",
                "source": "电话销售",
                "contact_id": 1,
                "gmt_modified": 1754566591000,
                "level_id_label": [
                    {
                        "label": "普通客户",
                        "value": 1
                    }
                ],
                "status_label": [
                    {
                        "label": "活跃",
                        "value": 1,
                        "children": null
                    }
                ],
                "source_label": [
                    {
                        "label": "电话销售",
                        "value": "电话销售",
                        "children": null
                    }
                ],
                "employee_id": 27,
                "employee_id_label": [
                    {
                        "label": "张三",
                        "value": 27
                    }
                ],
                "customer_type_label": [
                    {
                        "label": "企业",
                        "value": "企业",
                        "children": null
                    }
                ],
                "customer_name": "云兔科技有限公司",
                "id": 1,
                "customer_id": 1,
                "status": 1
            }
        ],
        "paging": {
            "currentPage": 1,
            "totalCount": 7,
            "pageSize": 10
        },
        "tableColumns": [
            {
                "dataIndex": "id",
                "title": "客户ID",
                "name": "客户ID",
                "type": "NUMBER",
                "description": "客户ID",
                "sortNum": 1,
                "id": 660446,
                "code": "id",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":false,\"pkField\":true,\"modifyDate\":false,\"autoIncrement\":true,\"rules\":null,\"required\":true,\"options\":null,\"disabled\":false,\"placeholder\":\"系统自动生成\",\"maxLength\":20,\"createDate\":false,\"tooltip\":\"客户唯一标识，系统自动生成\",\"tableVisible\":false,\"filterVisible\":false}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "customer_name",
                "title": "客户名称",
                "name": "客户名称",
                "type": "TEXT",
                "description": "客户名称",
                "sortNum": 2,
                "id": 660447,
                "code": "customer_name",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":true,\"options\":null,\"disabled\":false,\"placeholder\":\"请输入客户名称，如：张三/XX科技有限公司\",\"maxLength\":100,\"createDate\":false,\"tooltip\":\"客户的完整名称，用于展示和识别，建议包含客户类型信息\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "customer_type",
                "title": "客户类型",
                "name": "客户类型",
                "type": "RADIO",
                "description": "客户类型，(可选范围：企业,个人)",
                "sortNum": 3,
                "id": 660448,
                "code": "customer_type",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":true,\"options\":[{\"label\":\"企业\",\"value\":\"企业\",\"children\":null},{\"label\":\"个人\",\"value\":\"个人\",\"children\":null}],\"disabled\":false,\"placeholder\":\"请选择客户类型\",\"maxLength\":32,\"createDate\":false,\"tooltip\":\"选择客户类型，企业或个人\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "level_id",
                "title": "客户等级",
                "name": "客户等级",
                "type": "SELECT",
                "description": "客户等级ID",
                "sortNum": 4,
                "id": 660449,
                "code": "level_id",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"selectItemsSource\":{\"datasetCode\":\"7e8ea79ccbc64f48accf81e153806a53\",\"code\":\"level_id\",\"tenantCode\":\"yuntoo\",\"appCode\":\"app-f4c03acb\",\"label\":\"level_name\",\"source\":\"DB_TABLE\"},\"rules\":null,\"required\":true,\"options\":null,\"disabled\":false,\"placeholder\":\"请选择客户等级\",\"maxLength\":19,\"createDate\":false,\"tooltip\":\"选择客户所属等级，用于客户分类管理\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "contact_id",
                "title": "联系人",
                "name": "联系人",
                "type": "SELECT",
                "description": "联系人ID",
                "sortNum": 5,
                "id": 660450,
                "code": "contact_id",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"selectItemsSource\":{\"datasetCode\":\"85caff150d70457c96c50faa8919688f\",\"code\":\"contact_id\",\"tenantCode\":\"yuntoo\",\"appCode\":\"app-f4c03acb\",\"label\":\"name\",\"source\":\"DB_TABLE\"},\"rules\":null,\"required\":false,\"options\":null,\"disabled\":false,\"placeholder\":\"请选择联系人\",\"maxLength\":19,\"createDate\":false,\"tooltip\":\"选择该客户的主要联系人\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "source",
                "title": "客户来源",
                "name": "客户来源",
                "type": "SELECT",
                "description": "客户来源，（可选范围：电话销售、网上销售、官网、展会、他人介绍、社交媒体、其他）",
                "sortNum": 6,
                "id": 660451,
                "code": "source",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":false,\"options\":[{\"label\":\"电话销售\",\"value\":\"电话销售\",\"children\":null},{\"label\":\"网上销售\",\"value\":\"网上销售\",\"children\":null},{\"label\":\"官网\",\"value\":\"官网\",\"children\":null},{\"label\":\"展会\",\"value\":\"展会\",\"children\":null},{\"label\":\"他人介绍\",\"value\":\"他人介绍\",\"children\":null},{\"label\":\"社交媒体\",\"value\":\"社交媒体\",\"children\":null},{\"label\":\"其他\",\"value\":\"其他\",\"children\":null}],\"disabled\":false,\"placeholder\":\"请选择客户来源\",\"maxLength\":32,\"createDate\":false,\"tooltip\":\"客户获取的渠道来源，用于分析客户获取效果\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "address",
                "title": "联系地址",
                "name": "联系地址",
                "type": "TEXTAREA",
                "description": "联系地址",
                "sortNum": 7,
                "id": 660452,
                "code": "address",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":false,\"options\":null,\"disabled\":false,\"placeholder\":\"请输入详细联系地址\",\"maxLength\":255,\"createDate\":false,\"tooltip\":\"客户的详细联系地址，建议包含省市区和具体街道信息\",\"tableVisible\":false,\"filterVisible\":false}",
                "dataType": "static",
                "idx": false,
                "deleted": false
            },
            {
                "dataIndex": "status",
                "title": "客户状态",
                "name": "客户状态",
                "type": "SELECT",
                "description": "客户状态，(可选范围：1:活跃,0:流失,2:正常)",
                "sortNum": 8,
                "id": 660453,
                "code": "status",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":true,\"options\":[{\"label\":\"活跃\",\"value\":1,\"children\":null},{\"label\":\"流失\",\"value\":0,\"children\":null},{\"label\":\"正常\",\"value\":2,\"children\":null}],\"disabled\":false,\"placeholder\":\"请选择客户状态\",\"maxLength\":3,\"createDate\":false,\"tooltip\":\"客户当前状态，用于管理客户生命周期\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "employee_id",
                "title": "我司负责人",
                "name": "我司负责人",
                "type": "SELECT",
                "description": "我司负责人，（关联销售员工表的employee_id）",
                "sortNum": 9,
                "id": 660454,
                "code": "employee_id",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"selectItemsSource\":{\"datasetCode\":\"faff250163f345668947ea4e1ff50cda\",\"code\":\"employee_id\",\"tenantCode\":\"yuntoo\",\"appCode\":\"app-f4c03acb\",\"label\":\"employee_name\",\"source\":\"DB_TABLE\"},\"rules\":null,\"required\":true,\"options\":null,\"disabled\":false,\"placeholder\":\"请选择我司负责人\",\"maxLength\":19,\"createDate\":false,\"tooltip\":\"负责该客户的主要公司员工\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "remark",
                "title": "备注说明",
                "name": "备注说明",
                "type": "TEXTAREA",
                "description": "备注说明",
                "sortNum": 10,
                "id": 660455,
                "code": "remark",
                "extend": "{\"systemRetain\":false,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":false,\"options\":null,\"disabled\":false,\"placeholder\":\"请输入备注信息，如客户特殊需求、沟通记录等\",\"maxLength\":65535,\"createDate\":false,\"tooltip\":\"用于记录客户相关的额外信息\",\"tableVisible\":false,\"filterVisible\":false}",
                "dataType": "static",
                "idx": false,
                "deleted": false
            },
            {
                "dataIndex": "gmt_create",
                "title": "创建时间",
                "name": "创建时间",
                "type": "DATE",
                "description": "创建时间",
                "sortNum": 11,
                "id": 660456,
                "code": "gmt_create",
                "extend": "{\"systemRetain\":true,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":false,\"autoIncrement\":false,\"rules\":null,\"required\":true,\"options\":null,\"disabled\":true,\"placeholder\":\"系统自动维护\",\"maxLength\":19,\"createDate\":true,\"tooltip\":\"客户信息创建时间，系统自动维护\",\"tableVisible\":true,\"filterVisible\":true}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            },
            {
                "dataIndex": "gmt_modified",
                "title": "修改时间",
                "name": "修改时间",
                "type": "DATE",
                "description": "修改时间",
                "sortNum": 12,
                "id": 660457,
                "code": "gmt_modified",
                "extend": "{\"systemRetain\":true,\"logicDelete\":false,\"visible\":true,\"pkField\":false,\"modifyDate\":true,\"autoIncrement\":false,\"rules\":null,\"required\":true,\"options\":null,\"disabled\":true,\"placeholder\":\"系统自动维护\",\"maxLength\":19,\"createDate\":false,\"tooltip\":\"客户信息最后修改时间，系统自动维护\",\"tableVisible\":true,\"filterVisible\":false}",
                "dataType": "static",
                "idx": true,
                "deleted": false
            }
        ]
    },
    "failed": false
}
*/

// 简单封装 apiRequest
const apiRequest = async (path, options = {}) => {
  const response = await fetch(`https://api.yuntooai.com${path}`, {
    credentials: 'include', // 关键配置：跨域请求携带Cookie
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  return response.json();
};

function ChartFetch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 获取客户数据
    const fetchData = async () => {
      try {
        setLoading(true);
        // 客户列表接口
        const data = await apiRequest('/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList', {
          method: 'POST',
          body: JSON.stringify({ pageSize: 10, currentPage: 1 })
        });

        if (data.success) {
          // 统计客户状态分布
          const statusMap = {};
          data.data.tableData.forEach(item => {
            const statusLabel = item.status_label[0].label;
            statusMap[statusLabel] = (statusMap[statusLabel] || 0) + 1;
          });

          // 转换为饼图数据格式
          const pieData = Object.keys(statusMap).map(key => ({
            name: key,
            value: statusMap[key]
          }));

          setChartData(pieData);
        }
      } catch (err) {
        console.error('数据获取失败:', err);
        setError(err.message || '数据加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 饼图配置
  const getOption = () => ({
    title: {
      text: '客户状态分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '客户状态',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>数据图表示例</Title>
        <Paragraph>
          这是一个从真实API获取数据并展示的饼图示例，展示了客户状态的分布情况。
        </Paragraph>
      </Card>

      <Card style={{ marginTop: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" tip="正在加载数据..." />
          </div>
        ) : error ? (
          <Alert
            message="数据加载失败"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <>
            <ReactECharts 
              option={getOption()} 
              style={{ height: '400px' }}
              notMerge={true}
              lazyUpdate={true}
            />
            <Paragraph style={{ marginTop: '20px', textAlign: 'center' }}>
              数据来源：https://api.yuntooai.com/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList
            </Paragraph>
          </>
        )}
      </Card>
    </div>
  );
}

export default ChartFetch;