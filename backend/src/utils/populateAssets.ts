const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {

    // Modify the main function in populateAssets.ts to check for existing data first
    const count = await prisma.asset.count();
    if (count === 0) {
        console.log('No assets found, populating database...');
        // Read JSON file
        const filePath = path.join(__dirname, 'assets.json');
        // Specify the encoding to get a string
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        for (const stock of data.stocks) {
            await prisma.asset.create({
                data: stock
            });
        }

        for (const crypto of data.cryptocurrencies) {
            await prisma.asset.create({
                data: crypto
            });
        }
    } else {
        console.log('Assets already populated.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
