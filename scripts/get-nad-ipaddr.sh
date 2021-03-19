#!/bin/bash

export nadipaddr=$(netstat -nr | grep 10. | grep 255.255.255.255  | awk.exe '/255.255.255.255  255.255.255.255/ {print $4}')

echo "Nad IP Addr exported as var: nadipaddr"
echo "Its value is : $nadipaddr"
echo "Might want to run: "
echo "./dns.update-modelserver.guillaumeisabelle.com.sh \$nadipaddr"

