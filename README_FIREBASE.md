# Shreera Firebase setup

## 1. Install and configure
1. Install Node.js 20.19+ (Vite 8 requirement).
2. In the project directory run `npm install`.
3. Create a Firebase project at https://console.firebase.google.com/ and register a Web app.
4. Copy `.env.example` to `.env.local` and fill in the Firebase Web app config values. Set `VITE_ADMIN_EMAILS` to your admin email(s), comma separated.
5. Restart the Vite server after changing `.env.local`: `npm run dev`.

## 2. Enable Firebase products
- Authentication → Sign-in method → enable **Email/Password**.
- Firestore Database → create a database.
- Storage → get started. If Storage requires a billing plan for your project, use image URLs hosted by a provider you are authorized to use until Storage is enabled.

## 3. Secure the project
- In `firestore.rules`, replace `REPLACE_WITH_ADMIN_EMAIL` with the exact admin email used to sign in. Publish the rules in Firebase Console → Firestore → Rules.
- Do the same in `storage.rules`, then publish under Storage → Rules.
- The client-side `VITE_ADMIN_EMAILS` is only for showing the admin UI. Security is enforced by the rules, not by that environment variable.
- Do not deploy with permissive test rules. Never include service-account credentials in a frontend app.

## 4. Add products
The app listens to the Firestore `products` collection. Create documents with fields such as:
- `name` (string), `category` (string), `subCategory` (string)
- `price` and `originalPrice` (numbers), `discountPercentage` (number)
- `rating` and `reviewCount` (numbers), `inStock` (boolean), `isNew` (boolean)
- `image` (string URL), `galleryImages` (array of URL strings)
- `colors` (array of `{ name, hex, code }`), `sizes` (array of strings)
- `fabric`, `description` (strings), `highlights` (array of strings)

The Admin panel is available from Profile after signing in with an email in `VITE_ADMIN_EMAILS`. It can add products, upload product images to Storage, delete products and update order status. Uploaded files must be image files under 10 MB as enforced by the example Storage rules.

## 5. Current implementation notes
- Products use a Firestore real-time listener; if `products` is empty, demo products remain visible.
- Signed-in cart and wishlist data are saved to `users/{uid}`. Orders are saved in `orders` with a `userId` and read back for that user.
- Demo checkout still computes the order client-side. For a real store, move price validation, stock reservation, order creation and payment verification to a trusted server/Cloud Function before accepting real payments. Do not treat a client-calculated total as authoritative.
- If you seed products in Firestore, use the schema above so the existing screens have the fields they expect.
